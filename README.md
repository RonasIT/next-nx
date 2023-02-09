# @ronas-it/nx

## How to use

### Next.JS

Run `npx create-nx-workspace@latest test --preset=@ronas-it/next-nx` to generate workspace.

### React

Run `npx create-nx-workspace@latest test --preset=@ronas-it/react-nx` to generate workspace.

### Expo

Run `npx create-nx-workspace@latest test --preset=@ronas-it/expo-nx` to generate workspace.

## How to publish

### Next.JS

```shell
nx run next-nx:build && npm publish ./dist/packages/next-nx --access public
```

### React

```shell
nx run react-nx:build && npm publish ./dist/packages/react-nx --access public
```

### Expo

```shell
nx run expo-nx:build && npm publish ./dist/packages/expo-nx --access public
```
