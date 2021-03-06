export const initialTimingState = [
  {
    from: "10:00",
    to: "05:00",
    checked: false,
    label: "Sun",
    isFromPm: false,
    isToPm: true,
  },
  {
    from: "09:00",
    to: "05:00",
    checked: true,
    label: "Mon",
    isFromPm: false,
    isToPm: true,
  },
  {
    from: "09:00",
    to: "05:00",
    checked: true,
    label: "Tue",
    isFromPm: false,
    isToPm: true,
  },
  {
    from: "09:00",
    to: "05:00",
    checked: true,
    label: "Wed",
    isFromPm: false,
    isToPm: true,
  },
  {
    from: "09:00",
    to: "05:00",
    checked: true,
    label: "Thr",
    isToPm: true,
  },
  {
    from: "09:00",
    to: "05:00",
    checked: true,
    label: "Fri",
    isFromPm: false,
    isToPm: true,
  },
  {
    from: "09:00",
    to: "05:00",
    checked: false,
    label: "Sat",
    isFromPm: false,
    isToPm: true,
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
