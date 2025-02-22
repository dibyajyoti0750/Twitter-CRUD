document.addEventListener("DOMContentLoaded", () => {
  let verified = document.querySelectorAll(".username");
  let verifiedUsers = [
    "@naval",
    "@tferriss",
    "@elonmusk",
    "@jamesclear",
    "@markmanson",
    "@alexhormozi",
    "@sethgodin",
    "@garyvee",
    "@paulg",
    "@ryanholiday",
  ];

  verified.forEach((el) => {
    if (verifiedUsers.includes(el.textContent.trim())) {
      el.innerHTML = `${el.textContent}&nbsp; <i class='fa-solid fa-circle-check'></i>`;
    }
  });
});
