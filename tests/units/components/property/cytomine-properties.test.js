import { createLocalVue, shallowMount } from '@vue/test-utils';
import Buefy from 'buefy';

import CytomineProperties from '@/components/property/CytomineProperties';
import { Property } from 'cytomine-client';

jest.mock('cytomine-client', () => {
  return {
    Property: {
      delete: jest.fn().mockResolvedValue(true),
      PropertyInstance: {
        create: jest.fn().mockImplementation(() => ({
          id: Date.now(),
          key: '',
          value: '',
          save: jest.fn().mockResolvedValue(true),
          isNew: jest.fn().mockReturnValue(true),
        })),
      },
    },
    PropertyCollection: {
      fetchAll: jest.fn().mockResolvedValue({
        array: [
          { id: 1, key: 'Property 1', value: 'Value 1' },
        ],
      }),
    },
  };
});

describe('CytomineProperties.vue', () => {
  const mocks = {
    $notify: jest.fn(),
    $t: message => message,
  };

  let wrapper;
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Buefy);

    wrapper = shallowMount(CytomineProperties, {
      localVue,
      mocks: mocks,
      propsData: {
        canEdit: true,
      },
    });
  });

  it('should render the component correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.properties-wrapper').exists()).toBe(true);
  });

  it('should render the correct initial properties', () => {
    expect(wrapper.text()).toContain('Property 1');
    expect(wrapper.text()).toContain('Value 1');
  });

  it('should contain the correct initial data', () => {
    expect(wrapper.vm.loading).toBe(false);
    expect(wrapper.vm.error).toBe(false);
    expect(wrapper.vm.properties.length).toBe(1);
    expect(wrapper.vm.editedProperties.length).toBe(0);
    expect(wrapper.vm.newPropKey).toBe('');
    expect(wrapper.vm.newPropValue).toBe('');
    expect(wrapper.vm.showNewPropForm).toBe(false);
  });

  it('should add a new property correctly', async () => {
    const newPropertyInstance = Property.PropertyInstance.create();
    newPropertyInstance.id = 2;
    newPropertyInstance.key = 'New Property';
    newPropertyInstance.value = 'New Value';

    wrapper.setData({
      editedProperties: [newPropertyInstance]
    });
    await wrapper.vm.$nextTick();

    wrapper.find('button.add-prop').trigger('click');

    expect(wrapper.vm.editedProperties.length).toBe(1);
  });

  it('should delete a property correctly', async () => {
    const deleteButton = wrapper.find('button.delete.is-small');
    await deleteButton.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted()).toHaveProperty('update');
  });

  it('should handle property save correctly', async () => {
    const propertyInstance = Property.PropertyInstance.create();
    propertyInstance.key = 'New Property';
    propertyInstance.value = 'New Value';

    wrapper.setData({
      editedProperties: [propertyInstance]
    });

    await wrapper.vm.saveProp(0);

    expect(wrapper.emitted()).toHaveProperty('update');
  });

  it('should handle property cancel correctly', async () => {
    const propertyInstance = Property.PropertyInstance.create();
    propertyInstance.key = 'New Property';
    propertyInstance.value = 'New Value';

    wrapper.setData({
      editedProperties: [propertyInstance]
    });

    await wrapper.vm.cancelPropEdition(0);

    expect(wrapper.vm.editedProperties.length).toBe(0);
  });
});
