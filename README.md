# confirm-with-reveal
Based on [Confirm with Reveal](https://github.com/agoragames/confirm-with-reveal)

Replacement for window.confirm() using the dropdown plugin from ZURB Foundation 5. It might work with 6 as well but I haven't tested that.

For maximum **“are you really, really sure”** protection, the user can optionally be prompted to type out a word or phrase to enable the button to proceed.

Requires [jQuery](http://jquery.com/), as well as ZURB’s [Dropdown](http://foundation.zurb.com/sites/docs/v/5.5.3/components/dropdown.html) plugin.

## Basic usage

Run `$(document).confirmWithReveal()` after including this plugin to initialize it. This plugin must be included **after** jQuery (and if integrating with Rails, after the `jquery_ujs` plugin as well).

Then simply put a `data-confirm` attribute on whatever links or buttons you like (e.g. `<a href="…" data-confirm>…</a>`. You may put this attribute directly on a form element as well to confirm all submissions.

If the `data-confirm` attribute contains a plain string (e.g. `<a href="…" data-confirm="Are you sure?">…</a>`), the default `$.rails.confirm` or `window.confirm` function will perform the confirmation.

## Advanced usage

You may customize the plugin in two ways: in the initialization call (to apply to all instances of confirmation popups on the page) or directly in the individual link or button to be confirmed (for single-use configuration).

The initialization call accepts an options hash, with any or all of the following keys:

  - `dropdown_direction`: Dropdown direction (default:  “down”)
  - `dropdown_class`: CSS class(es) for the dropdown popup doing the confirmation
  - `title`: Text for title bar of dropdown (default: “Are you sure?”)
  - `title_class`: CSS class(es) for the title bar
  - `body`: Warning inside main content area of popup (default: “This action cannot be undone.”)
  - `body_class`: CSS class(es) for the main warning paragraph
  - `footer_class`: CSS class(es) for the bottom area containing the buttons
  - `ok`: Label for the button that does the delete/destroy/etc. (default: “Confirm”)
  - `ok_class`: CSS class(es) for the button that does the delete/destroy/etc.
  - `cancel`: Label for the button that cancels out of the action (default: “Cancel”)
  - `cancel_class`: CSS class(es) for the button that cancels out of the action
							
				
Example:

```javascript
$(document).confirmWithDropdown({
  ok: 'Make it so',
  cancel: 'Never mind'
})
```

You may also put a JSON-encoded object in the `data-confirm` attribute to customize a single confirmation popup. Rails’ `link_to` helper does the JSON conversion for you automatically; outside of Rails you may need to run `to_json` or the like explicitly.



## Events

The plugin fires two events: `cancel.dropdown` if a confirmable action is cancelled by the user, and `confirm.dropdown` if the user wants to continue. The events are triggered on the link, button, or form containing the `data-confirm` attribute, and bubble up the DOM hierarchy (so they can be handled on `$(document)` if desired). At this time, additional confirmation or validation cannot be attached via these events. This is on the roadmap for a future version.
