**Run locally**

1. Create a `.env` file in the root of the project using the `.env.example` as a template. Update the `NPM_TOKEN` variable with the token from the (GSAP Dashboard)[https://greensock.com/profile/66466-evans-hunt/content/?do=dashboard] (login/pass is in 1password.)

2. `docker run --rm -it -p 5173:5173 -v "$(pwd)":/usr/src/app -w /usr/src/app node:18-buster yarn install`

3. `docker run --rm -it -p 5173:5173 -v "$(pwd)":/usr/src/app -w /usr/src/app node:18-buster yarn vite --host`
