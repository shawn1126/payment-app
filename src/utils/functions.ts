export function maskUUID(uuid: string) {
  if (uuid.length > 0) {
    const firstSegment = uuid.slice(0, 6);
    const lastSegment = uuid.slice(-6);
    const maskLength = 3;
    const maskedPart = ".".repeat(maskLength);
    const maskedUUID = `${firstSegment}${maskedPart}${lastSegment}`;
    return maskedUUID;
  } else {
    return "";
  }
}
export function maskEmail(email: string) {
  const [username, domain] = email.split("@");
  const maskedUsername = username.substring(0, 3) + "*".repeat(3);
  const maskedDomain = "*".repeat(domain.length);
  const maskedEmail = maskedUsername + "@" + maskedDomain;
  return maskedEmail;
}

export function formatEpochTime(epochTime: number) {
  if (!epochTime) return "";
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(epochTime));
}
