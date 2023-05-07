const config = {
  security: {
    sudoPassword: process.env["SUDO_PASSWORD"],
  },
  db: {
    uri: process.env["DB_URI"],
  },
}

export default config
