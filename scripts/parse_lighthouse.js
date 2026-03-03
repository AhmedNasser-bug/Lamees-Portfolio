const fs = require('fs');

const reportPath = 'd:\\Study\\Programming\\Projects\\lamees portfolio\\Lamees-Portfolio\\lighthouse-report.json';
const outPath = 'd:\\Study\\Programming\\Projects\\lamees portfolio\\Lamees-Portfolio\\lighthouse_assessment.md';

const data = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

let md = '# Lighthouse Full Assessment Report\n\n';
md += '> Generated for the Lamees Portfolio index page to guide future suggestions and hotfixes.\n\n';

md += '## Core Metrics (Scores out of 100)\n\n';
const cats = data.categories;
md += `- **Performance:** ${Math.round(cats.performance.score * 100)}\n`;
md += `- **Accessibility:** ${Math.round(cats.accessibility.score * 100)}\n`;
md += `- **Best Practices:** ${Math.round(cats['best-practices'].score * 100)}\n`;
md += `- **SEO:** ${Math.round(cats.seo.score * 100)}\n\n`;

md += '## Detailed Audit Findings & Suggestions\n\n';

const audits = data.audits;
const failedAudits = Object.values(audits).filter(a => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'notApplicable' && a.scoreDisplayMode !== 'informative');

if (failedAudits.length === 0) {
    md += '*All major audits passed! Excellent job!*\n';
}

failedAudits.sort((a, b) => a.score - b.score).forEach(audit => {
    md += `### ${audit.title} (Score: ${Math.round(audit.score * 100)} / 100)\n`;
    md += `**Description:** ${audit.description}\n\n`;

    // Add specific items if available
    if (audit.details && audit.details.items && audit.details.items.length > 0) {
        md += '**Key Offenders / Suggestions:**\n';
        audit.details.items.slice(0, 5).forEach(item => {
            if (item.node && item.node.snippet) {
                md += `- \`${item.node.snippet}\`\n`;
            } else if (item.url) {
                const wasteBlock = item.wastedBytes ? ` (Wasted Bytes: ${(item.wastedBytes / 1024).toFixed(2)} KB)` : '';
                const wasteMs = item.wastedMs ? ` (Wasted Time: ${item.wastedMs} ms)` : '';
                md += `- ${item.url}${wasteBlock}${wasteMs}\n`;
            } else {
                // generic fallback
                const stringified = JSON.stringify(item).replace(/\{|\}/g, '');
                if (stringified.length < 200) md += `- ${stringified}\n`;
            }
        });
        md += '\n';
    } else {
        md += '\n';
    }
});

fs.writeFileSync(outPath, md, 'utf8');
console.log('Markdown report generated at ' + outPath);
