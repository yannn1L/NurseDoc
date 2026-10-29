import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  Footer,
  PageNumber,
  TableLayoutType,
  VerticalAlign,
  PageBreak,
} from 'docx';
import { ContentBlock, CoverBlock, NurseDocument } from '../types';

const FONT = 'Times New Roman';
const CONTENT_WIDTH = 9638; // twips — A4 (11906) - 2×1134 margin

function computeColumnWidths(headers: string[], rows: string[][], totalWidth = 9638): number[] {
  const n = headers.length;
  if (!n) return [];
  const MIN = Math.floor(totalWidth / (n * 2));
  const maxLens = headers.map((h, i) => {
    let max = String(h ?? '').length;
    (rows || []).forEach((r) => {
      const len = String(r[i] ?? '').length;
      if (len > max) max = len;
    });
    return Math.max(max, 8);
  });
  const total = maxLens.reduce((a, b) => a + b, 0);
  const widths = maxLens.map((len) => Math.max(MIN, Math.round((len / total) * totalWidth)));
  const sum = widths.reduce((a, b) => a + b, 0);
  if (sum !== totalWidth) widths[widths.length - 1] += totalWidth - sum;
  return widths;
}

function coverToDocx(b: CoverBlock): Paragraph[] {
  const out: Paragraph[] = [];

  out.push(new Paragraph({ spacing: { after: 400 }, children: [] }));

  if (b.header) {
    b.header.split('\n').forEach((line) => {
      out.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: line,
              bold: true,
              size: 24,
              font: FONT,
              allCaps: true,
            }),
          ],
        })
      );
    });
  }

  out.push(new Paragraph({ spacing: { after: 500 }, children: [] }));

  if (b.category) {
    out.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: b.category,
            bold: true,
            size: 26,
            font: FONT,
            color: '0D9488',
            allCaps: true,
          }),
        ],
      })
    );
  }

  out.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 600 },
      children: [
        new TextRun({
          text: b.judul,
          bold: true,
          size: 34,
          font: FONT,
          color: '0F172A',
        }),
      ],
    })
  );

  out.push(new Paragraph({ spacing: { after: 400 }, children: [] }));

  if (b.penyusun && b.penyusun.length) {
    out.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: 'Disusun oleh:',
            bold: true,
            size: 22,
            font: FONT,
          }),
        ],
      })
    );
    b.penyusun.forEach((p) => {
      out.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
          children: [
            new TextRun({ text: `${p.label}: `, size: 22, font: FONT, color: '64748B' }),
            new TextRun({ text: p.value, size: 22, font: FONT, bold: true }),
          ],
        })
      );
    });
  }

  out.push(new Paragraph({ spacing: { after: 800 }, children: [] }));

  if (b.footer) {
    b.footer.split('\n').forEach((line) => {
      out.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: line,
              bold: true,
              size: 24,
              font: FONT,
              allCaps: true,
            }),
          ],
        })
      );
    });
  }

  return out;
}

function blockToDocxParagraphs(b: ContentBlock, totalWidth: number): (Paragraph | Table)[] {
  const out: (Paragraph | Table)[] = [];
  const border = { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' };
  const noneBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
  const run = (text: string, opts: any = {}) =>
    new TextRun({ text: String(text ?? ''), font: FONT, size: 22, ...opts });
  const cellPara = (text: string, opts: any = {}) =>
    new Paragraph({
      spacing: { before: 40, after: 40, line: 300 },
      children: [run(text, { size: 20, ...opts })],
    });

  switch (b.type) {
    case 'paragraph':
      out.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 120, line: 360 },
          children: [run(b.text)],
        })
      );
      break;

    case 'subheading':
      out.push(
        new Paragraph({
          spacing: { before: 160, after: 60 },
          children: [run(b.text, { bold: true, size: 22 })],
        })
      );
      break;

    case 'section':
      out.push(
        new Paragraph({
          spacing: { before: 200, after: 80 },
          children: [
            b.num ? run(`${b.num}. `, { bold: true, size: 26, color: '0D9488' }) : null,
            run(b.heading, { bold: true, size: 26 }),
          ].filter(Boolean) as TextRun[],
        })
      );
      break;

    case 'heading':
      out.push(
        new Paragraph({
          spacing: { before: 160, after: 60 },
          children: [
            b.num ? run(`${b.num}. `, { bold: true, color: '475569' }) : null,
            run(b.text, { bold: true, size: 22 }),
          ].filter(Boolean) as TextRun[],
        })
      );
      break;

    case 'subsubsection':
      out.push(
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            b.num ? run(`${b.num}. `, { bold: true, color: '64748B' }) : null,
            run(b.text, { bold: true, size: 22 }),
          ].filter(Boolean) as TextRun[],
        })
      );
      break;

    case 'list':
      (b.items || []).forEach((item) =>
        out.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40 },
            children: [run(item)],
          })
        )
      );
      break;

    case 'steps':
      (b.items || []).forEach((s, i) =>
        out.push(
          new Paragraph({
            indent: { left: 360, hanging: 240 },
            spacing: { after: 80 },
            children: [
              run(`${i + 1}. `, { bold: true }),
              run(`${s.step}. `, { bold: true }),
              run(s.text),
            ],
          })
        )
      );
      break;

    case 'table': {
      const headers = b.headers || [];
      const rows = b.rows || [];
      const columnWidths = computeColumnWidths(headers, rows, totalWidth);
      const headerRow = new TableRow({
        tableHeader: true,
        children: headers.map(
          (h, i) =>
            new TableCell({
              width: { size: columnWidths[i], type: WidthType.DXA },
              shading: { fill: 'F1F5F9' },
              verticalAlign: VerticalAlign.TOP,
              margins: { top: 60, bottom: 60, left: 100, right: 100 },
              children: [cellPara(h, { bold: true })],
            })
        ),
      });
      const bodyRows = rows.map(
        (r) =>
          new TableRow({
            children: headers.map(
              (_, i) =>
                new TableCell({
                  width: { size: columnWidths[i], type: WidthType.DXA },
                  verticalAlign: VerticalAlign.TOP,
                  margins: { top: 60, bottom: 60, left: 100, right: 100 },
                  children: [cellPara(r[i] ?? '')],
                })
            ),
          })
      );
      out.push(
        new Table({
          width: { size: totalWidth, type: WidthType.DXA },
          columnWidths,
          layout: TableLayoutType.FIXED,
          borders: {
            top: border,
            bottom: border,
            left: border,
            right: border,
            insideHorizontal: border,
            insideVertical: border,
          },
          rows: [headerRow, ...bodyRows],
        })
      );
      out.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
      break;
    }

    case 'identity': {
      const rows = (b.fields || []).map(
        (f) =>
          new TableRow({
            children: [
              new TableCell({
                width: { size: 3200, type: WidthType.DXA },
                borders: {
                  top: noneBorder,
                  bottom: noneBorder,
                  left: noneBorder,
                  right: noneBorder,
                },
                margins: { top: 20, bottom: 20, left: 0, right: 60 },
                children: [new Paragraph({ children: [run(f.label, { color: '475569', size: 22 })] })],
              }),
              new TableCell({
                width: { size: totalWidth - 3200, type: WidthType.DXA },
                borders: {
                  top: noneBorder,
                  bottom: noneBorder,
                  left: noneBorder,
                  right: noneBorder,
                },
                margins: { top: 20, bottom: 20, left: 0, right: 0 },
                children: [new Paragraph({ children: [run(`: ${f.value || ' '}`, { bold: true, size: 22 })] })],
              }),
            ],
          })
      );
      if (b.title) {
        out.push(
          new Paragraph({
            spacing: { before: 120, after: 60 },
            children: [run(b.title, { bold: true, size: 22 })],
          })
        );
      }
      out.push(
        new Table({
          width: { size: totalWidth, type: WidthType.DXA },
          columnWidths: [3200, totalWidth - 3200],
          layout: TableLayoutType.FIXED,
          borders: {
            top: noneBorder,
            bottom: noneBorder,
            left: noneBorder,
            right: noneBorder,
            insideHorizontal: noneBorder,
            insideVertical: noneBorder,
          },
          rows,
        })
      );
      out.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
      break;
    }

    case 'pathway': {
      if (b.title) {
        out.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 120, after: 80 },
            children: [run(b.title, { bold: true, size: 22, allCaps: true })],
          })
        );
      }
      (b.steps || []).forEach((s, i) => {
        out.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 40, after: 40 },
            indent: { left: 900, right: 900 },
            shading: {
              type: 'clear' as any,
              fill: s.highlight ? 'FFF1F2' : 'F0FDFA',
              color: 'auto',
            },
            border: {
              top: { style: BorderStyle.SINGLE, size: 4, color: s.highlight ? 'FDA4AF' : '99F6E4' },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: s.highlight ? 'FDA4AF' : '99F6E4' },
              left: { style: BorderStyle.SINGLE, size: 4, color: s.highlight ? 'FDA4AF' : '99F6E4' },
              right: { style: BorderStyle.SINGLE, size: 4, color: s.highlight ? 'FDA4AF' : '99F6E4' },
            },
            children: [
              run(s.text, { bold: true, size: 20, color: s.highlight ? '881337' : '134E4A' }),
            ],
          })
        );
        if (i < b.steps.length - 1) {
          out.push(
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 20, after: 20 },
              children: [run('↓', { size: 22, color: '94A3B8' })],
            })
          );
        }
      });
      out.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
      break;
    }

    case 'bibliography':
      (b.items || []).forEach((ref, i) => {
        out.push(
          new Paragraph({
            indent: { left: 480, hanging: 480 },
            spacing: { after: 80, line: 360 },
            alignment: AlignmentType.JUSTIFIED,
            children: [run(`${i + 1}. `, { bold: true }), run(ref)],
          })
        );
      });
      break;

    case 'analysis': {
      if (b.title) {
        out.push(
          new Paragraph({
            spacing: { before: 200, after: 80 },
            shading: { type: 'clear' as any, fill: 'F0FDFA', color: 'auto' },
            children: [run(b.title, { bold: true, size: 22, color: '0D9488', allCaps: true })],
          })
        );
      }
      (b.items || []).forEach((it) => {
        out.push(
          new Paragraph({
            spacing: { before: 100, after: 40 },
            children: [run(it.label, { bold: true, size: 22, color: '0F172A' })],
          })
        );
        out.push(
          new Paragraph({
            spacing: { after: 60 },
            alignment: AlignmentType.JUSTIFIED,
            children: [run(it.content, { size: 21, color: '334155' })],
          })
        );
        if (it.rationale) {
          out.push(
            new Paragraph({
              indent: { left: 300 },
              spacing: { after: 100 },
              border: { left: { style: BorderStyle.SINGLE, size: 12, color: '0D9488' } },
              shading: { type: 'clear' as any, fill: 'F0FDFA', color: 'auto' },
              alignment: AlignmentType.JUSTIFIED,
              children: [
                run('Rasional: ', { bold: true, color: '0D9488', size: 20 }),
                run(it.rationale, { italics: true, color: '134E4A', size: 20 }),
              ],
            })
          );
        }
      });
      break;
    }

    case 'quote':
      out.push(
        new Paragraph({
          indent: { left: 360 },
          spacing: { before: 120, after: 120 },
          border: { left: { style: BorderStyle.SINGLE, size: 12, color: '0D9488' } },
          children: [run(`"${b.text}"`, { italics: true, size: 21, color: '134E4A' })],
        })
      );
      break;

    case 'callout':
      out.push(
        new Paragraph({
          indent: { left: 240, right: 240 },
          spacing: { before: 120, after: 120 },
          shading: {
            type: 'clear' as any,
            fill: b.variant === 'warning' ? 'FFFBEB' : 'F0F9FF',
            color: 'auto',
          },
          children: [run(b.text, { size: 21 })],
        })
      );
      break;

    case 'diagnosa':
      if (b.priority) {
        out.push(
          new Paragraph({
            spacing: { before: 120, after: 20 },
            children: [run(b.priority, { bold: true, size: 18, color: '0D9488' })],
          })
        );
      }
      out.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [run(b.title, { bold: true, size: 22 })],
        })
      );
      if (b.detail) {
        out.push(
          new Paragraph({
            spacing: { after: 120 },
            children: [run(b.detail, { size: 20, color: '475569' })],
          })
        );
      }
      break;

    case 'soap':
      [
        ['S', 'Subjektif', b.s],
        ['O', 'Objektif', b.o],
        ['A', 'Analisis', b.a],
        ['P', 'Perencanaan', b.p],
      ].forEach(([k, l, v]) =>
        out.push(
          new Paragraph({
            indent: { left: 240 },
            spacing: { after: 80 },
            children: [
              run(`${k} — `, { bold: true, color: '0D9488' }),
              run(`${l}: `, { bold: true }),
              run(v),
            ],
          })
        )
      );
      break;

    default:
      out.push(
        new Paragraph({
          children: [run(`[blok: ${(b as any).type}]`, { italics: true, color: '94A3B8' })],
        })
      );
  }
  return out;
}

export async function exportToDocx(doc: NurseDocument): Promise<void> {
  const children: (Paragraph | Table)[] = [];

  // Check if document has a cover
  const coverBlock = doc.sections.find((s) => s.isCover)?.blocks?.find((b) => b.type === 'cover') as
    | CoverBlock
    | undefined;

  if (coverBlock) {
    children.push(...coverToDocx(coverBlock));
    children.push(new Paragraph({ children: [new PageBreak()] }));
  } else {
    // Title fallback
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [new TextRun({ text: doc.title, bold: true, size: 32, font: FONT })],
      })
    );

    if (doc.subtitle) {
      children.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [
            new TextRun({ text: doc.subtitle, italics: true, size: 22, font: FONT, color: '64748B' }),
          ],
        })
      );
    }

    const metaLines = [
      `Disusun oleh ${doc.author}`,
      doc.ruangan ? `Ruangan: ${doc.ruangan}` : null,
      doc.clinicalTeacher ? `Clinical Teacher: ${doc.clinicalTeacher}` : null,
      doc.clinicalInstructor ? `Clinical Instructor: ${doc.clinicalInstructor}` : null,
      doc.date,
    ].filter(Boolean) as string[];

    metaLines.forEach((line) =>
      children.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
          children: [new TextRun({ text: line, size: 20, font: FONT, color: '475569' })],
        })
      )
    );

    children.push(
      new Paragraph({
        spacing: { before: 200, after: 200 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' } },
        children: [],
      })
    );
  }

  // Sections
  for (const sec of doc.sections) {
    if (sec.isCover) continue;

    const isBab = /^BAB\s/i.test(sec.heading);
    const headingText = isBab
      ? `${sec.num || ''} ${sec.heading}`.trim()
      : sec.num
      ? `${sec.num}. ${sec.heading}`
      : sec.heading;

    children.push(
      new Paragraph({
        alignment: isBab ? AlignmentType.CENTER : AlignmentType.LEFT,
        spacing: { before: 260, after: 120 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: '0D9488' } },
        children: [
          new TextRun({
            text: headingText,
            bold: true,
            size: 26,
            font: FONT,
            allCaps: isBab,
          }),
        ],
      })
    );

    for (const b of sec.blocks) {
      blockToDocxParagraphs(b, CONTENT_WIDTH).forEach((p) => children.push(p));
    }
  }

  // Document setup
  const docFile = new Document({
    creator: 'nurseDoc',
    title: doc.title,
    description: doc.summary || '',
    styles: {
      default: {
        document: {
          run: { font: FONT, size: 22 },
          paragraph: { spacing: { line: 360 } },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 },
            margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 },
          },
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({ text: 'Hal. ', size: 18, font: FONT, color: '94A3B8' }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 18, font: FONT, color: '94A3B8' }),
                  new TextRun({ text: ' dari ', size: 18, font: FONT, color: '94A3B8' }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, font: FONT, color: '94A3B8' }),
                ],
              }),
            ],
          }),
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(docFile);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${doc.id}.docx`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
  }, 200);
}
