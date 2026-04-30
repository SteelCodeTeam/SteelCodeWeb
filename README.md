# SteelCodeWeb — SteelCode Team Official Website

> Official website of SteelCode Team. Single-page Angular app with data driven from GitHub raw JSONs — no backend, no CMS, just push to update.

---

## `$ ./stack.sh`

![Angular](https://img.shields.io/badge/Angular-19-2C2C2A?style=flat-square&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-2C2C2A?style=flat-square&logo=typescript&logoColor=white)
![CSS](https://img.shields.io/badge/CSS_Custom_Properties-2C2C2A?style=flat-square&logo=css3&logoColor=white)
![GitHub Raw](https://img.shields.io/badge/Data-GitHub_Raw_JSON-2C2C2A?style=flat-square&logo=github&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-2C2C2A?style=flat-square&logo=nginx&logoColor=white)
![OVH](https://img.shields.io/badge/VPS-OVH-2C2C2A?style=flat-square&logoColor=white)

---

## `$ ls sections/`

| Section | Description |
|---------|-------------|
| `hero/` | Animated typing terminal effect, CTAs |
| `stats/` | Animated counters with ease-out cubic |
| `projects/` | Cards with tag filtering |
| `stack/` | Skills grouped by category with filtering |
| `team/` | Member cards with avatar, role and socials |
| `blog/` | Last 5 newsletters sorted by date, linked to GitHub |
| `contact/` | All social links + support block |

---

## `$ cat architecture.md`

```
src/
├── app/
│   ├── core/
│   │   ├── config/
│   │   │   └── api.config.ts       ← all GitHub raw URLs in one place
│   │   └── models/
│   │       ├── hero.model.ts
│   │       ├── stats.model.ts
│   │       ├── projects.model.ts
│   │       ├── stack.model.ts
│   │       ├── team.model.ts
│   │       ├── blog.model.ts
│   │       └── contact.model.ts
│   ├── sections/
│   │   ├── hero/
│   │   ├── stats/
│   │   ├── projects/
│   │   ├── stack/
│   │   ├── team/
│   │   ├── blog/
│   │   └── contact/
│   └── shared/components/
│       ├── nav/                    ← floating navbar with scroll spy
│       └── footer/
└── styles/
    ├── variables.css               ← design tokens
    └── reset.css
```

---

## `$ cat data.md`

All content is fetched at runtime from GitHub raw — **no rebuild needed to update content**.

| File | Source repo |
|------|-------------|
| `hero.json` | `SteelCodeTeam/SteelCodeTeam` |
| `stats.json` | `SteelCodeTeam/SteelCodeTeam` |
| `projects.json` | `SteelCodeTeam/SteelCodeTeam` |
| `stack.json` | `SteelCodeTeam/SteelCodeTeam` |
| `team.json` | `SteelCodeTeam/SteelCodeTeam` |
| `contact.json` | `SteelCodeTeam/SteelCodeTeam` |
| `index/index.json` | `SteelCodeTeam/SteelCodeNewsletter` |

Every component has a **hardcoded fallback** — the site never breaks if a JSON is missing or the request fails.

---

## `$ ./dev.sh`

```bash
npm install
ng serve
```

---

## `$ ./build.sh`

```bash
ng build --configuration production
```

Output goes to `dist/pag-web/browser/`. Serve with Nginx:

```nginx
server {
    listen 80;
    server_name steelcode.team;
    root /var/www/pagweb;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## `$ ./update-content.sh`

To update any section — **no redeploy needed**, just edit the JSON in the corresponding repo and push:

```bash
# Example: add a new project
# Edit SteelCodeTeam/SteelCodeTeam/projects.json → push → done
```

To add a newsletter issue:

```bash
# Edit SteelCodeTeam/SteelCodeNewsletter/index/index.json → push → done
# The site picks up the last 5 sorted by date automatically
```

---

## `$ ./connect.sh`

[![Discord](https://img.shields.io/badge/Discord-2C2C2A?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/YHqMTRYAMT)
[![GitHub](https://img.shields.io/badge/GitHub-2C2C2A?style=for-the-badge&logo=github&logoColor=white)](https://github.com/steelcodeteam)
[![Web](https://img.shields.io/badge/Web-steelcode.team-2C2C2A?style=for-the-badge&logoColor=white)](https://steelcode.team)

---

`[ EOF ]`
