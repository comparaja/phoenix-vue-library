import { shallowMount } from "@vue/test-utils";
import SinglePicker from "./SinglePicker.vue";

const wrapper = shallowMount(SinglePicker, {
  propsData: {
    value: undefined,
    options: [
      {
        value: 1,
        title: "Option 1"
      },
      {
        value: 2,
        title: "Option 2"
      }
    ],
    label: "Test"
  }
});

describe("single-picker", () => {
  it("has a mounted hook", () => {
    expect(typeof SinglePicker.mounted).toBe("function");
  });

  it("has a updated hook", () => {
    expect(typeof SinglePicker.updated).toBe("function");
  });

  it("begins closed", () => {
    expect(wrapper.find(".content").isVisible()).toBe(false);
    expect(wrapper.vm.showContent).toBe(false);
  });

  it("label is correctly assigned", () => {
    expect(wrapper.find(".title").text()).toBe("Test");
  });

  it("opens", async () => {
    //test if wrapper begins closed
    expect(wrapper.vm.showContent).toBe(false);
    expect(wrapper.find(".content").isVisible()).toBe(false);
    wrapper.vm.show();
    await wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find(".content").isVisible()).toBe(true);
    });
    expect(wrapper.vm.showContent).toBe(true);
  });

  it("closes", async () => {
    //test if wrapper begins opened
    expect(wrapper.vm.showContent).toBe(true);
    expect(wrapper.find(".content").isVisible()).toBe(true);
    wrapper.vm.hide();
    await wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find(".content").isVisible()).toBe(false);
    });
    expect(wrapper.vm.showContent).toBe(false);
  });

  it("toggles content", async () => {
    //starts closed
    expect(wrapper.find(".content").isVisible()).toBe(false);
    expect(wrapper.vm.showContent).toBe(false);

    wrapper.vm.toggleContent();
    await wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find(".content").isVisible()).toBe(true);
    });
    expect(wrapper.vm.showContent).toBe(true);

    wrapper.vm.toggleContent();
    await wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find(".content").isVisible()).toBe(false);
    });
    expect(wrapper.vm.showContent).toBe(false);
  });

  it("options appear inside content", async () => {
    //opens component content
    wrapper.vm.show();
    await wrapper.vm.$nextTick().then(() => {
      expect(wrapper.findAll(".option").length).toBe(2);
      expect(
        wrapper
          .findAll(".option")
          .at(0)
          .text()
      ).toBe("Option 1");
      expect(
        wrapper
          .findAll(".option")
          .at(0)
          .isVisible()
      ).toBe(true);
      expect(
        wrapper
          .findAll(".option")
          .at(1)
          .text()
      ).toBe("Option 2");
      expect(
        wrapper
          .findAll(".option")
          .at(1)
          .isVisible()
      ).toBe(true);
    });
  });

  it("changes value when option is selected", async () => {
    //clicks on first option
    await wrapper
      .findAll(".option")
      .at(1)
      .trigger("click")
      .then(() => {
        expect(wrapper.vm.selected.value).toBe(2);
      });

    //clicks on second option
    await wrapper
      .findAll(".option")
      .at(0)
      .trigger("click")
      .then(() => {
        expect(wrapper.vm.selected.value).toBe(1);
      });
  });

  it("changes label when option is selected", async () => {
    //clicks on first option
    await wrapper
      .findAll(".option")
      .at(1)
      .trigger("click")
      .then(() => {
        expect(wrapper.find(".title").text()).toBe("Option 2");
      });

    //clicks on second option
    await wrapper
      .findAll(".option")
      .at(0)
      .trigger("click")
      .then(() => {
        expect(wrapper.find(".title").text()).toBe("Option 1");
      });
  });

  it("defaults first options as defaultValue", () => {
    expect(wrapper.vm.defaultVal).toBe(1);
  });

  it("selects by value", () => {
    wrapper.vm.selectByValue(2);
    expect(wrapper.vm.selected.value).toBe(2);
    expect(wrapper.vm.selected.title).toBe("Option 2");

    wrapper.vm.selectByValue(1);
    expect(wrapper.vm.selected.value).toBe(1);
    expect(wrapper.vm.selected.title).toBe("Option 1");
  });

  it("resets the values", () => {
    wrapper.vm.clear();
    expect(wrapper.vm.selected.value).toBe(undefined);
  });
});
