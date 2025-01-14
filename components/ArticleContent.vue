<template>
    <ClientOnly>
      <div class="prose lg:prose-xl max-w-none bg-white shadow-lg rounded-lg p-8">
        <ContentRenderer v-if="doc.body" :value="doc.body">
          <template #default="{ value }">
            <div v-for="(node, index) in value.children" :key="index">
              <!-- Render headings, paragraphs, lists, and emphasis tags -->
              <component :is="node.tag" v-bind="node.props">
                <template v-for="(child, idx) in node.children" :key="idx">
                  <span v-if="child.type === 'text'">{{ child.value }}</span>
                  <component v-else :is="child.tag" v-bind="child.props">
                    <template v-for="(innerChild, i) in child.children" :key="i">
                      <span v-if="innerChild.type === 'text'">{{ innerChild.value }}</span>
                    </template>
                  </component>
                </template>
              </component>
            </div>
          </template>
        </ContentRenderer>
        <p v-else class="text-gray-500">No content found.</p>
      </div>
    </ClientOnly>
  </template>
  
  <script setup>
  defineProps({
    doc: {
      type: Object,
      required: true,
    },
  });
  </script>
  