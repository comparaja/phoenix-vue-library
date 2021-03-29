# Single Picker

This component simulates the Select behaviour, maintaining a consistent appearance in all browsers

## Example

<Demo componentName="examples-single-picker-doc"/>

## Usage

```vue
<single-picker responsive required
  v-model="value"
  :defaultValue="defaultValue"
  :options="options"
  :label="'Label'"
  :color="color">
</single-picker>
```

## Props

- **value** *[Object]*  
The value assigned to the component.  
Best usage with *v-model*.

- **responsive** *[boolean]*  
When set to true, the component becomes fluid, occupying 100% of the parent.

- **required** *[boolean]*  
When set to *true*, the component always returns a value (never gets *undefined*).

- **defaultValue** *[Object]*
The default value asssigned to the component.  
Used when ***required*** is true.

- **options** *[Array]*  
The options that appears in the dropdown as a list, there's no limit on the number of options.  
Each option can have:
  - **title** *[String]* ***required***
  - **value** *[Object]* ***required***
  - **icon** *[String]*  (**eg.** *fa fas-user*), requires an icon library.

```javascript
let options = [
  {
    title: 'Option 1',
    value: 1
  },
  {
    title: 'Option 2',
    value: 2
  }
]
```

- **label** *[String]*  
The title/label of the input.

- **color** *[Object]*  
Customized colors for the component.

```javascript
let colors =  {
    main: "#076B9C",
    secoundary: "#E6F1F9"
  }
```

## Source code

<SourceCode>
<<< @/src/components/SinglePicker/SinglePicker.vue
</SourceCode>