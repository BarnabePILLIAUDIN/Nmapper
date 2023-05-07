# Nmapper by Barnabé PILLIAUDIN

## What can I do whith Nmapper ?

Nmapper is a web interface for Nmap. Whith Nmapper you can choose wich of the 3 scan options you want to use between

1. Syn scan (-sS)
2. Udp scan (-sU)
3. Version scan (-sV)

You can also choose options like

- Host time out
- max retries
- Show os
- Scan only the ports you wants

## How to setup

- Create a .env.local file with the following fields
  `SUDO_PASSWORD=<Your sudo password> `
  `DB_URI=<Your db uri>`
