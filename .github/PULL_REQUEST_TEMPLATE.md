## Describe your changes

## Issue ticket number and link

## Screenshots or videos

## Checklist before requesting a review

### General

- [ ] The file name should use `kebab-case` or `snake_case`.
- [ ] Remove debug code.
- [ ] Remove redundant space chars.
- [ ] Check for special characters when copying from elsewhere. (Mostly ‘ and -) You should retype.
- [ ] Ensure there's no hard coding texts or numbers.
- [ ] Write `Unit test` and `End to End test`.

### Front End

- [ ] Image should be JPG and file size should be below 300kb, video should be WEBM or MP4 and file size below 10mb.
- [ ] Add texts into translation files `src/locales/[LANG].json`.
- [ ] The component should have attributes `data-testid="[COMPONENT_NAME]"` and {...rest}.
- [ ] If it is a shared component, place it in `src/components`, otherwise place it in
      `src/modules/[FEATURE_NAME]/components`
- [ ] Test UI on desktop, tablet, mobile.
