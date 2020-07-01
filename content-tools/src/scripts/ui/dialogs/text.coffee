class ContentTools.TextDialog extends ContentTools.DialogUI

    # A dialog to support inserting/update a table

    constructor: (@config, @text)->
        if @text
            super('Update Font size to text tags')
        else
            super('Insert text tags with font size')

    # Methods

    mount: () ->
        # Mount the widget
        super()

        # Build the initial configuration of the dialog
        cfg = @config
        if @text
            cfg = {
                size: 14
                }

        # Update dialog class
        ContentEdit.addCSSClass(@_domElement, 'ct-table-dialog')

        # Update view class
        ContentEdit.addCSSClass(@_domView, 'ct-table-dialog__view')

        # Add sections

        # Body
        @_domBodySection = @constructor.createDiv([
            'ct-section',
            'ct-section--applied',
            'ct-section--contains-input'
            ])
        @_domView.appendChild(@_domBodySection)

        domBodyLabel = @constructor.createDiv(['ct-section__label'])
        domBodyLabel.textContent = ContentEdit._('Font Size')
        @_domBodySection.appendChild(domBodyLabel)

        @_domBodyInput = document.createElement('input')
        @_domBodyInput.setAttribute('class', 'ct-section__input')
        @_domBodyInput.setAttribute('maxlength', '2')
        @_domBodyInput.setAttribute('name', 'fontsize')
        @_domBodyInput.setAttribute('type', 'text')
        @_domBodyInput.setAttribute('value', cfg.size)
        @_domBodySection.appendChild(@_domBodyInput)

        # Add controls
        domControlGroup = @constructor.createDiv(
            ['ct-control-group', 'ct-control-group--right'])
        @_domControls.appendChild(domControlGroup)

        # Apply button
        @_domApply = @constructor.createDiv([
            'ct-control',
            'ct-control--text',
            'ct-control--apply'
            ])
        @_domApply.textContent = 'Apply'
        domControlGroup.appendChild(@_domApply)

        # Add interaction handlers
        @_addDOMEventListeners()

    save: () ->
        # Save the table. The event trigged by saving the table includes a
        # dictionary with the table configuration in:
        
        detail = {
            size: parseInt(@_domBodyInput.value),
            }

        @dispatchEvent(@createEvent('save', detail))

    unmount: () ->
        # Unmount the component from the DOM
        super()

        @_domBodyInput = null
        @_domBodySection = null
        @_domApply = null

    # Private methods

    _addDOMEventListeners: () ->
        # Add event listeners for the widget
        super()

        # Focus on the columns input if the section is clicked
        @_domBodySection.addEventListener 'click', (ev) =>
            @_domBodyInput.focus()

        # Check the value body input (number of columns) and enable/disable the
        # 'Apply' button depending on whether or not the value is a valid
        # integer between 1 and 999.
        @_domBodyInput.addEventListener 'input', (ev) =>
            valid = /^[1-9]\d{0,1}$/.test(ev.target.value)
            if valid
                ContentEdit.removeCSSClass(
                    @_domBodyInput,
                    'ct-section__input--invalid'
                    )
                ContentEdit.removeCSSClass(
                    @_domApply,
                    'ct-control--muted'
                    )
            else
                ContentEdit.addCSSClass(
                    @_domBodyInput,
                    'ct-section__input--invalid'
                    )
                ContentEdit.addCSSClass(
                    @_domApply,
                    'ct-control--muted'
                    )

        # Apply button
        @_domApply.addEventListener 'click', (ev) =>
            ev.preventDefault()

            # Check the button isn't muted, if it is then the table
            # configuration isn't valid.
            cssClass = @_domApply.getAttribute('class')
            if cssClass.indexOf('ct-control--muted') == -1
                @save()