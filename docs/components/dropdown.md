# Dropdown

This component simulates the Select behaviour, maintaining a consistent appearance in all browsers

## Example

<Demo componentName="examples-dropdown-doc"/>

## Usage

```vue
<dropdown responsive
  v-model="value"
  :options="options">
</dropdown>
```

## Props

- **value** *[Object]*  
The value assigned to the component  
Best usage with *v-model*

- **options** *[Array]*  
The options tha appear in the dropdown as a list, there's no limit on the number of options

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

- **responsive** *[boolean]*  
When set to true, the component becomes fluid, occupying 100% of the parent

## Source code

<SourceCode>
<<< @/src/components/Dropdown/Dropdown.vue
</SourceCode>