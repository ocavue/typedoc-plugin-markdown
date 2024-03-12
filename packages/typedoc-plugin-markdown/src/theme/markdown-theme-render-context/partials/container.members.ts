import { horizontalRule } from '@plugin/theme/lib/markdown';
import { DeclarationReflection } from 'typedoc';
import { MarkdownThemeRenderContext } from '../..';

/**
 * Renders a collection of members.
 *
 * @category Container Partials
 */
export function members(
  context: MarkdownThemeRenderContext,
  model: DeclarationReflection[],
  headingLevel: number,
): string {
  const md: string[] = [];
  const displayHr = (reflection: DeclarationReflection) => {
    if (context.options.getValue('outputFileStrategy') === 'modules') {
      return context.helpers.isGroupKind(reflection);
    }
    return true;
  };
  const items = model?.filter((item) => !item.hasOwnDocument);
  items?.forEach((item, index) => {
    md.push(context.partials.member(item, headingLevel));
    if (index < items.length - 1 && displayHr(item)) {
      md.push(horizontalRule());
    }
  });
  return md.join('\n\n');
}
