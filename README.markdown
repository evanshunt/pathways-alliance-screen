**Run locally**

1. GSAP has bonus files that require users to pay a license fee. For them to manage this, GSAP is installed from their private repository. In order to get installation working locally and also on netlify we have to do a couple of steps to get the package installed properly.

   - Create a `.env` file in the root of the project using the `.env.example` as a template. Update the `GSAP_TOKEN` variable with the token from the (GSAP Dashboard)[https://greensock.com/profile/66466-evans-hunt/content/?do=dashboard] (login/pass is in 1password.)

   - Open the `.npmrc` file and uncomment the line underneath "Local install" and add the GSAP token directly into the file. Then, comment out the line under "Netlify deploy", then go to the next step to install the library locally.

2. `docker run --rm -it -p 5173:5173 -v "$(pwd)":/usr/src/app -w /usr/src/app node:18-buster yarn install`

3. After all the required packages have been installed properly, revert the change to `.npmrc` so that the line under "Local install" is commented (make sure to delete the GSAP token from this file) and the line under "Netlify deploy" is uncommented.

4. `docker run --rm -it -p 5173:5173 -v "$(pwd)":/usr/src/app -w /usr/src/app node:18-buster yarn vite --host`
