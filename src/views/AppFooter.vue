<template>
  <div class="footer">
    <div class="footer__image">
      <img
        alt="Company logo"
        class="footer__company-logo"
        src="@/assets/onestepgps_white_logotype.svg
      "
        height="75px"
      />
    </div>
    <div class="footer__contact">
      <span class="footer__contact-title">CONTACT US</span>
      <span class="footer__contact-address"
        ><img
          alt="GPS Image"
          class="footer__contact-image"
          src="@/assets/pin.png
      "
        />675 Glenoaks Blvd Suite C, San Fernando, CA 91340</span
      >
      <span class="footer__contact-phone">
        <img alt="Phone Image" class="footer__contact-image" src="@/assets/phone.png" />(833)
        478-6937
      </span>
      <span class="footer__contact-email">
        <img
          alt="Email Image"
          class="footer__contact-image"
          src="@/assets/mail.png"
        />support@onestepgps.com
      </span>
    </div>
  </div>
</template>

<style>
.footer {
  grid-column: span 2;
  padding: 25px;
  display: flex;
}
.footer__image {
  width: 50%;
}
.footer__contact {
  color: white;
  font-family: 'cabinetgrotesk';
  width: 50%;
  border-left: 1px solid white;
  padding-left: 12px;
}

.footer__contact-title {
  display: block;
  margin-bottom: 20px;
}

.footer__contact-address {
  display: block;
  margin-bottom: 12px;
}
.footer__contact-image {
  width: 20px;
  margin: 0 20px;
}

@media screen and (max-width: 430px) {
  .footer {
    display: flex;
    flex-direction: column;
  }
  .footer__contact {
    width: 100%;
  }
  .footer__image {
    width: 100%;
  }
  .footer__company-logo {
    width: 100%;
  }
  .footer__contact-phone {
    display: block;
    margin-bottom: 12px;
  }
  .footer__contact-image {
    margin: 0 4px;
  }
}
@media screen and (min-width: 391px) and (max-width: 1024px) {
  .footer__contact {
    font-size: 12px;
  }
  .footer__company-logo {
    width: 95%;
  }
  .footer__contact-image {
    margin: 0 5px;
  }
}
</style>
