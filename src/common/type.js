export const initialTimingState = [
  {
    from: "10:00",
    to: "00:00",
    checked: true,
    label: "Sun",
    isFromPm: false,
    isToPm: false,
  },
  {
    from: "09:00",
    to: "00:00",
    checked: true,
    label: "Mon",
    isFromPm: false,
    isToPm: false,
  },
  {
    from: "09:00",
    to: "00:00",
    checked: true,
    label: "Tue",
    isFromPm: false,
    isToPm: false,
  },
  {
    from: "09:00",
    to: "00:00",
    checked: true,
    label: "Wed",
    isFromPm: false,
    isToPm: false,
  },
  {
    from: "09:00",
    to: "00:00",
    checked: true,
    label: "Thr",
    isToPm: false,
  },
  {
    from: "09:00",
    to: "00:00",
    checked: true,
    label: "Fri",
    isFromPm: false,
    isToPm: false,
  },
  {
    from: "09:00",
    to: "00:00",
    checked: false,
    label: "Sat",
    isFromPm: false,
    isToPm: false,
  },
];

export const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return null;
};
