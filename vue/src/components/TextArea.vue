<script setup>
import { onMounted, ref } from "vue";

defineProps({
	modelValue: {
		type: String,
		required: true,
	},
});

defineEmits(["update:modelValue"]);

const input = ref(null);

onMounted(() => {
	if (input.value.hasAttribute("autofocus")) {
		input.value.focus();
	}
});

defineExpose({ focus: () => input.value.focus() });
</script>
<template>
	<textarea
        class="bg-gray-50 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 block w-full text-gray-900 border-0 rounded-md shadow-sm"
        spellcheck="false" rows="4"
		:value="modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
		ref="input">
    </textarea>
</template>