const provider = (process.env.FORM_PROVIDER || "formsubmit").toLowerCase();

function fail(message) {
  console.error(`Form config error: ${message}`);
  process.exit(1);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

switch (provider) {
  case "formsubmit": {
    const email = process.env.FORM_EMAIL?.trim();
    if (!email) {
      fail("FORM_EMAIL is required when FORM_PROVIDER=formsubmit");
    }
    if (!isValidEmail(email)) {
      fail("FORM_EMAIL must be a valid email address");
    }
    break;
  }
  default:
    fail(`Unknown FORM_PROVIDER "${provider}". Supported: formsubmit`);
}

console.log(`Form provider OK: ${provider}`);
