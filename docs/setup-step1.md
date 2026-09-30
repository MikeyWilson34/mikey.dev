# Step 1 setup: things only you can do

The workflows in `.github/workflows/` are ready, but GitHub and Netlify need a few settings that only the account owner can change. Do these once, in order.

Quick definitions:
- **Secret**: a value (like a password) that GitHub stores encrypted and hands to workflows. Nobody can read it back, including you.
- **Variable**: like a secret, but not hidden. Use it for non-sensitive values like a URL.
- **Status check**: a pass/fail result that a workflow job reports on a PR. `pr.yml` reports `build`, `preview-deploy`, `preview-comment`, and `e2e`.
- **Ruleset** (branch protection): GitHub rules that stop anyone, including you, from changing `main` unless the rules are met. This is how the Deploy Gate is enforced.

## 1. Create a Netlify personal access token

This lets GitHub Actions deploy to Netlify as you.

1. Go to app.netlify.com, click your avatar (bottom-left or top-right) → **User settings**.
2. **Applications** → **Personal access tokens** → **New access token**.
3. Description: `github-actions mikey.dev`. Set an expiration (for example 1 year) and put a reminder in your calendar to renew it.
4. Click **Generate token** and copy it right away. Netlify shows it only once.

## 2. Find your Site ID

1. In Netlify, open the mikey.dev project (Netlify now calls sites "projects").
2. **Project configuration** → **General** → **Project details**.
3. Copy the **Project ID** (older screens call it **Site ID**). It looks like `1a2b3c4d-....`.

## 3. Add the secrets and the variable to GitHub

In the GitHub repo: **Settings** → **Secrets and variables** → **Actions**.

On the **Secrets** tab, click **New repository secret** twice:

| Name | Value |
| --- | --- |
| `NETLIFY_AUTH_TOKEN` | the token from step 1 |
| `NETLIFY_SITE_ID` | the Project ID from step 2 |

On the **Variables** tab, click **New repository variable**:

| Name | Value |
| --- | --- |
| `PROD_URL` | your live site URL, e.g. `https://mikey.dev` (no trailing slash) |

`PROD_URL` is optional. Without it, the post-deploy smoke test after each production deploy is skipped.

## 4. Turn off Netlify auto-builds

GitHub Actions deploys now (ADR 0002). If Netlify also builds on every push, it would publish code that hasn't passed the tests.

1. In Netlify: **Project configuration** → **Build & deploy** → **Continuous deployment**.
2. Under **Build settings**, click **Configure**, set **Build status** to **Stopped builds**, and **Save**.

   Stopped builds keeps the repo linked, so you still see it in Netlify, but nothing builds on push. Unlinking the repo (**Manage repository** → **Unlink**) also works if you prefer.

3. Check: push any commit. In Netlify's **Deploys** tab, no new deploy should appear unless it came from GitHub Actions. Deploys made by Actions show the message `main @ abc1234` or `PR #N @ abc1234`.

## 5. Protect `main` with a ruleset

Do this after the workflows have run once (open a test PR first). GitHub only suggests check names it has already seen.

1. GitHub repo → **Settings** → **Rules** → **Rulesets** → **New ruleset** → **New branch ruleset**.
2. **Ruleset name**: `main`. **Enforcement status**: **Active**.
3. **Bypass list**: leave it empty so the rules apply to you too.
4. **Target branches** → **Add target** → **Include default branch**.
5. Tick these rules:
   - **Restrict deletions**
   - **Block force pushes**
   - **Require a pull request before merging**. Set required approvals to `0`, because you're the only person on the repo and GitHub won't let you approve your own PR.
   - **Require status checks to pass**. Click **Add checks** and add exactly:
     - `build`
     - `e2e`

     Leave source as **GitHub Actions** if it asks.
6. Click **Create**.

Only `build` and `e2e` need to be required. `e2e` is the Deploy Gate: it fails whenever the Preview Deploy fails, so requiring `preview-deploy` as well would add nothing. Fork PRs never get a `preview-deploy` because forks don't receive secrets.

## 6. Confirm it all works

1. Create a branch, make a small visible change, push it, and open a PR into `main`.
2. On the PR's **Checks** tab you should see `build`, then `preview-deploy`, then `e2e` and `preview-comment`.
3. A comment from `github-actions` should appear on the PR with a link like `https://pr-12--<your-site>.netlify.app`. Open it and look for your change. Pushing again updates the same comment instead of adding a new one.
4. The **Merge** button should stay blocked until `build` and `e2e` are green.
5. When a test fails, open the run and scroll to **Artifacts** at the bottom. Download `playwright-report` and open `index.html` to see what failed.
6. Merge the PR. On the **Actions** tab, the **Deploy** workflow runs `gate` → `deploy-production` → `post-deploy-smoke`. When it finishes, the live site shows your change.
