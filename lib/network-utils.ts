/**
 * Network engineering utilities for IP calculations, CIDR notation,
 * Cisco IOS commands, and packet route simulation.
 */

export interface SubnetResult {
  cidr: string;
  ip: string;
  prefix: number;
  networkAddress: string;
  broadcastAddress: string;
  subnetMask: string;
  subnetMaskBinary: string;
  wildcardMask: string;
  firstUsableIp: string;
  lastUsableIp: string;
  totalHosts: number;
  usableHosts: number;
  ipClass: "A" | "B" | "C" | "D" | "E";
  isPrivate: boolean;
  binaryIp: string;
  ciscoConfig: {
    interfaceConfig: string;
    subinterfaceConfig: string;
    aclConfig: string;
    hsrpConfig: string;
    natConfig: string;
  };
}

function ipToLong(ip: string): number {
  return (
    ip
      .split(".")
      .reduce((acc, octet) => ((acc << 8) + parseInt(octet, 10)) >>> 0, 0) >>> 0
  );
}

function longToIp(long: number): string {
  return [
    (long >>> 24) & 255,
    (long >>> 16) & 255,
    (long >>> 8) & 255,
    long & 255,
  ].join(".");
}

function longToBinary(long: number): string {
  return [
    ((long >>> 24) & 255).toString(2).padStart(8, "0"),
    ((long >>> 16) & 255).toString(2).padStart(8, "0"),
    ((long >>> 8) & 255).toString(2).padStart(8, "0"),
    (long & 255).toString(2).padStart(8, "0"),
  ].join(".");
}

export function calculateSubnet(cidrInput: string): SubnetResult {
  const [ipPart, prefixPart] = cidrInput.trim().split("/");
  const prefix = parseInt(prefixPart, 10);
  const ipLong = ipToLong(ipPart);

  // Subnet mask
  const maskLong = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
  const wildcardLong = (~maskLong) >>> 0;

  const networkLong = (ipLong & maskLong) >>> 0;
  const broadcastLong = (networkLong | wildcardLong) >>> 0;

  const subnetMask = longToIp(maskLong);
  const wildcardMask = longToIp(wildcardLong);
  const networkAddress = longToIp(networkLong);
  const broadcastAddress = longToIp(broadcastLong);

  let totalHosts = Math.pow(2, 32 - prefix);
  let usableHosts = 0;
  let firstUsableIp = "";
  let lastUsableIp = "";

  if (prefix === 31) {
    // RFC 3021 Point-to-Point links
    usableHosts = 2;
    firstUsableIp = networkAddress;
    lastUsableIp = broadcastAddress;
  } else if (prefix === 32) {
    // Host route / Loopback
    totalHosts = 1;
    usableHosts = 1;
    firstUsableIp = networkAddress;
    lastUsableIp = networkAddress;
  } else {
    usableHosts = Math.max(0, totalHosts - 2);
    firstUsableIp = longToIp(networkLong + 1);
    lastUsableIp = longToIp(broadcastLong - 1);
  }

  // Class determine
  const firstOctet = (ipLong >>> 24) & 255;
  let ipClass: "A" | "B" | "C" | "D" | "E" = "C";
  if (firstOctet <= 126) ipClass = "A";
  else if (firstOctet <= 191) ipClass = "B";
  else if (firstOctet <= 223) ipClass = "C";
  else if (firstOctet <= 239) ipClass = "D";
  else ipClass = "E";

  // RFC 1918 Private range check
  // 10.0.0.0 - 10.255.255.255
  // 172.16.0.0 - 172.31.255.255
  // 192.168.0.0 - 192.168.255.255
  const secondOctet = (ipLong >>> 16) & 255;
  const isPrivate =
    firstOctet === 10 ||
    (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) ||
    (firstOctet === 192 && secondOctet === 168);

  const binaryIp = longToBinary(ipLong);
  const subnetMaskBinary = longToBinary(maskLong);

  // Cisco IOS syntax generation
  const ciscoConfig = {
    interfaceConfig: [
      `interface GigabitEthernet0/0/1`,
      ` description Trunk_or_Gateway_Link`,
      ` ip address ${firstUsableIp || networkAddress} ${subnetMask}`,
      ` no shutdown`,
    ].join("\n"),

    subinterfaceConfig: [
      `interface GigabitEthernet0/0.10`,
      ` encapsulation dot1Q 10`,
      ` ip address ${firstUsableIp || networkAddress} ${subnetMask}`,
      ` no shutdown`,
    ].join("\n"),

    aclConfig: [
      `ip access-list extended SECURE_TRAFFIC_ACL`,
      ` permit tcp ${networkAddress} ${wildcardMask} any eq 443`,
      ` permit tcp ${networkAddress} ${wildcardMask} any eq 80`,
      ` permit icmp ${networkAddress} ${wildcardMask} any echo`,
      ` deny ip any any log`,
    ].join("\n"),

    hsrpConfig: [
      `interface GigabitEthernet0/1`,
      ` standby version 2`,
      ` standby 1 ip ${firstUsableIp || networkAddress}`,
      ` standby 1 priority 110`,
      ` standby 1 preempt`,
      ` standby 1 authentication md5 key-string IsaacSec2026`,
    ].join("\n"),

    natConfig: [
      `ip nat inside source static ${firstUsableIp || networkAddress} 203.0.113.10`,
      `ip access-list standard NAT_POOL_PERMIT`,
      ` permit ${networkAddress} ${wildcardMask}`,
      `ip nat inside source list NAT_POOL_PERMIT interface GigabitEthernet0/0/0 overload`,
    ].join("\n"),
  };

  return {
    cidr: `${ipPart}/${prefix}`,
    ip: ipPart,
    prefix,
    networkAddress,
    broadcastAddress,
    subnetMask,
    subnetMaskBinary,
    wildcardMask,
    firstUsableIp,
    lastUsableIp,
    totalHosts,
    usableHosts,
    ipClass,
    isPrivate,
    binaryIp,
    ciscoConfig,
  };
}
