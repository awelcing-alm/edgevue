<template>
    <ClientOnly>
      <article class="prose lg:prose-xl max-w-none bg-white shadow-lg rounded-lg p-8">
        <ContentRenderer v-if="doc.body" :value="doc.body">
          <template #default="{ value }">
            <div v-for="(node, index) in value.children" :key="index" class="mb-4">
              <component
                :is="node.tag"
                v-bind="node.props"
                class="leading-relaxed"
              >
                <template v-for="(child, idx) in node.children" :key="idx">
                  <!-- Render text -->
                  <span v-if="child.type === 'text'" class="leading-relaxed">{{ child.value }}</span>
                  
                  <!-- Render emphasis (bold/italic) -->
                  <component v-else-if="['strong', 'em', 'code'].includes(child.tag)" :is="child.tag" v-bind="child.props">
                    <span v-if="child.type === 'text'">{{ child.value }}</span>
                  </component>
                  
                  <!-- Recursively render nested lists and blockquotes -->
                  <component v-else :is="child.tag" v-bind="child.props">
                    <template v-for="(innerChild, i) in child.children" :key="i">
                      <span v-if="innerChild.type === 'text'">{{ innerChild.value }}</span>
                      <component v-else :is="innerChild.tag" v-bind="innerChild.props">
                        <span v-if="innerChild.type === 'text'">{{ innerChild.value }}</span>
                      </component>
                    </template>
                  </component>
                </template>
              </component>
            </div>
          </template>
        </ContentRenderer>
        <p v-else class="text-gray-500">No content found.</p>
      </article>
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
  
  <style scoped>
  .prose {
    max-width: none;
  }
  
  .prose h1,
  .prose h2,
  .prose h3 {
    @apply text-emerald-900 font-bold;
  }
  
  .prose p {
    @apply leading-relaxed text-gray-700;
  }
  
  .prose ul,
  .prose ol {
    @apply my-4 ml-6 list-disc list-decimal text-gray-700;
  }
  
  .prose li {
    @apply mb-2;
  }
  
  .prose blockquote {
    @apply border-l-4 border-emerald-500 pl-4 bg-emerald-50 italic text-gray-800;
  }
  
  .prose strong {
    @apply text-emerald-900;
  }
  
  .prose em {
    @apply text-emerald-600 italic;
  }
  
  .prose img {
    @apply rounded-lg shadow-md mt-4 mb-4;
  }
  
  .prose hr {
    @apply my-8 border-t-2 border-emerald-100;
  }
  </style>
  