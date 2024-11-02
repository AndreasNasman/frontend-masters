# Frontend Master

To initialize this project, use:

```sh
git clone --recurse-submodules https://github.com/AndreasNasman/frontend-masters.git
```

or

```git
git clone https://github.com/AndreasNasman/frontend-masters.git
cd frontend-masters
git submodule update --init --recursive --remote
```

You can also use the latter command to apply upstream changes.

Then, to checkout a branch in each submodule (and exit detached HEAD state), run

```git
git submodule foreach 'git switch solutions || git switch main || git switch master || git switch gh-pages'
```
