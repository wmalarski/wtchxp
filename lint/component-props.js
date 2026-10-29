import { definePlugin, defineRule } from "vite-plus/lint/plugins";

const useComponentProps = defineRule({
  meta: {
    messages: {
      useComponentProps: 'Use ComponentProps<"{{ tag }}"> instead of {{ type }}.',
    },
  },
  create(context) {
    return {
      TSTypeReference(node) {
        if (
          node.typeName.type !== "TSQualifiedName" ||
          node.typeName.left.type !== "Identifier" ||
          node.typeName.left.name !== "JSX" ||
          !node.typeName.right.name.endsWith("HTMLAttributes")
        ) {
          return;
        }

        const name = node.typeName.right.name;
        const prefix = name.slice(0, -"HTMLAttributes".length);
        const tag = prefix.length > 0 ? prefix.toLowerCase() : "tag";

        context.report({
          node,
          messageId: "useComponentProps",
          data: { tag, type: `JSX.${name}` },
        });
      },
    };
  },
});

const componentPropsName = defineRule({
  meta: {
    messages: {
      componentPropsName: 'Props type for "{{ component }}" must be named "{{ expected }}".',
    },
  },
  create(context) {
    return {
      VariableDeclarator(node) {
        if (node.id.type !== "Identifier" || !node.id.typeAnnotation) {
          return;
        }

        const annotation = node.id.typeAnnotation.typeAnnotation;
        if (
          annotation.type !== "TSTypeReference" ||
          annotation.typeName.type !== "Identifier" ||
          annotation.typeName.name !== "Component"
        ) {
          return;
        }

        const props = annotation.typeArguments?.params[0];
        if (!props || props.type !== "TSTypeReference" || props.typeName.type !== "Identifier") {
          return;
        }

        const expected = `${node.id.name}Props`;
        if (props.typeName.name !== expected) {
          context.report({
            node: props,
            messageId: "componentPropsName",
            data: { component: node.id.name, expected },
          });
        }
      },
    };
  },
});

export default definePlugin({
  meta: { name: "wtchxp" },
  rules: {
    "component-props-name": componentPropsName,
    "use-component-props": useComponentProps,
  },
});
