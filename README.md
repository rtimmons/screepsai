# Ryan's Screeps Code

Not designed for re-use by other players, but happy to accept PRs to make my creeps do better :)

## Setup

1. Create two files `secret-email.txt` and `secret-password.txt` containing your [screeps.com](https://screeps.com/) email and password.

    These files are `.gitignore`d so you won't accidentally commit them.

2. Run `npm install` to download dependencies.

3. Run `grunt mochaTest` to run any tests.

4. Run `grunt screeps` to upload code to your screeps `default` branch.


Summary:

```sh
echo -e "ryan@foo.com" > secret-email.txt
echo -e "raygun"       > secret-password.txt
npm install
grunt mochaTest
grunt screeps
```