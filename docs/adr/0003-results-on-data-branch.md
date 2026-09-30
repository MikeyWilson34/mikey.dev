# Test results live on a data-only branch, not in the site build

Every Pipeline Run and Nightly Check writes its Run Record to a separate data-only branch, and the Live Quality Page fetches it when someone visits. We rejected baking results into the site build, because the Nightly Check would then have to redeploy production every night, and it would always be testing a brand-new deploy instead of the site as it has been running.
