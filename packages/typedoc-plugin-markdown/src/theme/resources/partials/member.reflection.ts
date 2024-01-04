import { DeclarationReflection } from 'typedoc';
import { MarkdownThemeRenderContext } from '../..';
import { OutputFileStrategy } from '../../../options/maps';
import { heading, unorderedList } from '../../../support/elements';
import { hasIndex, hasToc, isAbsoluteIndex } from '../../helpers';

/**
 * @category Partials
 */
export function reflectionMember(
  context: MarkdownThemeRenderContext,
  reflection: DeclarationReflection,
  headingLevel: number,
): string {
  const md: string[] = [];

  if (reflection.comment) {
    md.push(context.comment(reflection.comment, headingLevel));
  }

  if (reflection.typeHierarchy?.next) {
    md.push(context.memberHierarchy(reflection.typeHierarchy, headingLevel));
  }

  if (reflection.typeParameters) {
    md.push(
      heading(
        headingLevel,
        context.getTextContent('kind.type-parameter.plural'),
      ),
    );
    if (context.options.getValue('parametersFormat') === 'table') {
      md.push(context.typeParametersTable(reflection.typeParameters));
    } else {
      md.push(
        context.typeParametersList(reflection.typeParameters, headingLevel + 1),
      );
    }
  }

  if (reflection.implementedTypes) {
    md.push(heading(headingLevel, context.getTextContent('label.implements')));
    md.push(
      unorderedList(
        reflection.implementedTypes.map((implementedType) =>
          context.someType(implementedType),
        ),
      ),
    );
  }

  if ('signatures' in reflection && reflection.signatures) {
    reflection.signatures.forEach((signature) => {
      md.push(context.signatureMember(signature, headingLevel));
    });
  }

  if ('indexSignature' in reflection && reflection.indexSignature) {
    md.push(heading(headingLevel, context.getTextContent('label.indexable')));
    md.push(context.indexSignatureTitle(reflection.indexSignature));
  }

  if (hasIndex(reflection)) {
    const isAbsolute = isAbsoluteIndex(reflection);

    if (isAbsolute) {
      md.push(heading(headingLevel, context.getTextContent('label.index')));
    }
    md.push(
      context.reflectionIndex(
        reflection,
        false,
        isAbsolute ? headingLevel + 1 : headingLevel,
      ),
    );
  }

  if (
    !context.options.getValue('hideInPageTOC') &&
    hasToc(
      reflection,
      context.options.getValue('outputFileStrategy') ===
        OutputFileStrategy.Members,
    )
  ) {
    const tocContent = context.reflectionIndex(
      reflection,
      true,
      headingLevel + 1,
    );
    if (tocContent.length) {
      md.push(heading(headingLevel, context.getTextContent('label.contents')));
      md.push(context.reflectionIndex(reflection, true, headingLevel + 1));
    }
  }

  md.push(context.members(reflection, headingLevel));

  return md.join('\n\n');
}
