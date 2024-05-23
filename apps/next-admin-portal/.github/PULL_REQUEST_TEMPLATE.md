## Describe your changes

## Issue ticket number and link

## Screenshots or videos

## Checklist before requesting a review

- [ ] Ensure there's no hard coding texts or numbers, and add texts into translation files `locales/[LANG].json`.
- [ ] The file name should use `kebab-case` or `snake_case`.
- [ ] Remove debug code.
- [ ] Remove redundant space chars.
- [ ] Check for special characters when copying from elsewhere. (Mostly ‘ and -) You should retype.
- [ ] Image should be JPG and file size should be below 300kb, video should be WEBM or MP4 and file size below 5mb.
- [ ] The component should have attributes `data-testid="[COMPONENT_NAME]"` and {...rest}.
- [ ] If it is a shared component, place it in `common/components`, otherwise place it in
      `modules/[FEATURE_NAME]/components`

---

- [ ] Test UI on desktop, tablet, mobile.
- [ ] Write `Unit test` and `End to End test`.
