(function () {
	var $;

	$ = this.jQuery;

	$.fn.extend({
		confirmWithDropdown: function (options) {
			var defaults, do_confirm, handler, settings;
			if (options == null) {
				options = {};
			}
			defaults = {
				dropdown_direction: 'down',
				dropdown_class: '',
				title: 'Are you sure?',
				title_class: 'confirm__title',
				body: 'This action cannot be undone.',
				body_class: 'confirm__body',
				footer_class: 'confirm__footer',
				ok: 'Confirm',
				ok_class: 'button expanded success',
				cancel: 'Cancel',
				cancel_class: 'button expanded alert'
			};
			settings = $.extend({}, defaults, options);
			do_confirm = function ($el) {
				var confirm_button, confirm_html, confirm_label, el_options, dropdown, option, _ref;
				el_options = $el.data('confirm');

				if ($el.attr('data-confirm') == null) {
					return true;
				}
				if ((typeof el_options === 'string') && (el_options.length > 0)) {
					try	{
						el_options = $.parseJSON(el_options);
					}
					catch(err)
					{
						return (window.confirm).call(window, el_options);
					}
				}
				option = function (name) {
					return el_options[name] || settings[name];
				};

				dropdown = $("<div id='foundation_confirm_dropdown' data-dropdown-content class='f-dropdown " + (option('dropdown_class')) + "' data-options='align: " + (option('dropdown_direction')) + "'>\n  <h2 data-confirm-title class='" + (option('title_class')) + "'></h2>\n  <p data-confirm-body class='" + (option('body_class')) + "'></p>\n  <div data-confirm-footer class='" + (option('footer_class')) + "'>\n    <a data-confirm-cancel class='" + (option('cancel_class')) + "'></a>\n  </div>\n</div>");
				confirm_button = $el.is('a') ? $el.clone() : $('<a/>');
				confirm_button.removeAttr('data-confirm data-dropdown').attr('class', option('ok_class')).html(option('ok')).on('click', function (e) {
					if ($(this).prop('disabled')) {
						return false;
					}
					$el.trigger('confirm.dropdown', e);
					if ($el.is('form, :input, button')) {
						return $el.closest('form').removeAttr('data-confirm').submit();
					}
				});
				dropdown.find('[data-confirm-title]').html(option('title'));
				dropdown.find('[data-confirm-body]').html(option('body'));
				dropdown.find('[data-confirm-cancel]').html(option('cancel')).on('click', function (e) {
					Foundation.libs.dropdown.close($('#foundation_confirm_dropdown'));
					return $el.trigger('cancel.dropdown', e);
				});
				dropdown.find('[data-confirm-footer]').append(confirm_button);

				// append dropdown to body and reflow foundation
				var dropdownWindow = dropdown.appendTo($('body')).foundation('dropdown', 'reflow');
				Foundation.libs.dropdown.open($('#foundation_confirm_dropdown'), $el);
				$el.attr('data-dropdown', '');

				// Close dropdown on all clicks
				$el.add(document).click(function () {
					Foundation.libs.dropdown.close($('#foundation_confirm_dropdown'));
				});

				// Listen for orientation changes and trigger dropdown resize
				window.addEventListener("orientationchange", function () {
					Foundation.libs.dropdown.resize($('#foundation_confirm_dropdown'), $el);
				}, false);
				// Listen for window resize and trigger dropdown resize
				window.addEventListener("resize", function () {
					Foundation.libs.dropdown.resize($('#foundation_confirm_dropdown'), $el);
				}, false);

				// Remove dropdown after close
				dropdownWindow.on('closed.fndtn.dropdown', function (e) {
					return dropdown.remove();
				});
				return false;
			};

			handler = function (e) {
				if (!(do_confirm($(this)))) {
					$(this).attr('data-dropdown', 'foundation_confirm_dropdown');
					e.preventDefault();
					return e.stopImmediatePropagation();
				}
			};
			return this.each(function () {
				var $el;
				$el = $(this);
				$el.on('click', 'a[data-confirm], :input[data-confirm], button[data-confirm]', handler);
				return $el;
			});

		}
	});

}).call(this);