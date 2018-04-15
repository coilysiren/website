## A Standard Release

* Run all the automated tests
* Run the tests again
* Run the tests a third time
* Test, **by hand**, all the testable changes for this release
* Create a git tag for this release (ex: v0.1.4 alpha)
* Create change notes for the release
* Push to git branch develop
* *Take an hour break*

---

* Confirm that you still want to update production
* Push to git branch production
* Push to heroku branch master
* Apply migrations to production
* **Immediately** test all the changed features on live
* Check for any new angry tweets*
* *Take another hour break*

---

* Check for any new angry tweets again*
* Throw a small party

\* If at any point you encounter angry tweets, either rollback the release or proceed to section: "A Hotfix Release"

## A Hotfix Release

* Panic
* Run all the automated tests
* Confirm, **by hand**, that the hotfix is functional
* Consider testing more, don't because time constraints
* Push to git branch develop
* Push to git branch production
* Push to heroku branch master
* **Panickly** check the changed features on live
* Check for new angry tweets
    * If new angry tweets about broken features, return to start
    * Otherwise, continue
* *Take a 20 minute break*
* Create a git tag for this release
* Push to git branch develop
* Push to git branch production
* *Break for the day*