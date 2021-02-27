<template>
	<div
		class="c-editor"
	>
					<rich-text
						slot="reference"
						v-model="formData"
						:commands="commands"
						@change="
							() => {
							}
						"
					/>
	</div>
</template>


<script>
export default {
	data() {
		return {
			formData: {},
			commands: [
				"bold",
				"italic",
				"underline",
				"strike",
				"heading",
				"bullet_list",
				"ordered_list",
				"table",
				"blockquote",
				"code",
				"code_block",
				"image",
				"link",
				"undo",
				"redo",
			]
		};
	}
};
</script>