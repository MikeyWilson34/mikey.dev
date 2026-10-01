# mikey.dev

A portfolio that presents Mikey as an SDET/QA engineer by showing tested, working systems rather than describing them.

## Language

### Pipeline

**Pipeline Run**:
One execution of the automated test-and-deploy workflow, triggered by a pull request or a merge to `main`.
_Avoid_: Build, job, CI run

**Preview Deploy**:
A temporary, publicly reachable copy of the site built from a pull request, which that PR's tests run against.
_Avoid_: Staging, test environment, branch deploy

**Deploy Gate**:
The rule that nothing reaches `main` or production unless every test in its Pipeline Run passes.
_Avoid_: Check, blocker

**Nightly Check**:
A scheduled run of tests against the live production site, independent of any code change.
_Avoid_: Cron job, smoke run, monitor

**Run Record**:
The saved summary of one Pipeline Run or Nightly Check: when it ran, what it tested, and what passed or failed.
_Avoid_: Report, artifact, results file

**Flaky Test**:
A test that failed and then passed on automatic retry within the same run.
_Avoid_: Intermittent, unstable test

### Showcase

**Live Quality Page**:
The public page showing the latest Pipeline Run on `main` and the latest Nightly Check exactly as they are, failures included.
_Avoid_: Dashboard, status page, test report

**Status Badge**:
The one-line summary of the Live Quality Page shown on the home page, linking to it.
_Avoid_: Shield, indicator

**History Strip**:
The row of the last 30 Run Records on the Live Quality Page, one pass/fail mark each.
_Avoid_: Timeline, trend chart

### NBA API

**Watchlist**:
A user-created, editable list of players, and the only thing in the NBA API that users can change.
_Avoid_: Favorites, roster, team

**Sandbox Key**:
A free, temporary key any visitor can get. It owns that visitor's Watchlists, and they expire with it after 24 hours.
_Avoid_: API key, token, account

**Data Refresh**:
The nightly copy of current-season NBA data from a public source into the API's own database.
_Avoid_: Sync, import, scrape

**Current Season**:
The most recent NBA season with games played. During the offseason this is the season that just ended, and the site says so.
_Avoid_: This season, latest season

### AI

**Failure Explanation**:
An AI-written, plain-English probable cause attached to a failed Run Record.
_Avoid_: AI summary, diagnosis, triage
