/* LDT INC | the words of the operating system for /explore/. Cut from home.js by qa/xp_build.py: change the text in home.js, then run the script again. */
window.LDT_SYSDATA=(()=>{
const DIMS=[
 {n:'Proposition',slug:'proposition',k:'An offer is only as strong as the business built to keep it.',
  ap:'What the business can actually sell, deliver and sustain, and whether offer, organisation and economics line up.',s:['Offer','Organisation','Economics']},
 {n:'Expansion',slug:'expansion',k:'How a business enters and grows in new markets: expansion structured around real market conditions, adapted positioning and partner structures that can actually be operated.',
  ap:'Expansion routes and partner structures shaped around real market conditions, growth logic and local relevance.',
  fig:['37','Markets'],list:['Europe','Middle East','Asia'],detail:'International market positioning, expansion and partnership development.',s:['Europe','Middle East','Asia']},
 {n:'Operations',slug:'operations',k:'The operating structure that connects strategy to execution, so positioning, experience, production, delivery and market execution work as one.',
  ap:'Operating structures that align teams, delivery, execution and decision-making.',
  fig:['10 to 25%','Cost reduction'],list:['Operating models','Structural clarity','Execution'],detail:'Resolution of structural inefficiencies impacting performance, execution and scalable growth.',s:['Operating models','Structural clarity','Execution']},
 {n:'Commercial Architecture',slug:'commercial-architecture',k:'The commercial system behind growth: pricing, margin logic, partnerships and revenue architecture built into one structure that works.',
  ap:'Pricing, margin logic and revenue structures that make the business commercially viable and scalable.',
  fig:['+5 to 15 pts','Margin improvement'],list:['Pricing strategy and price architecture','Pricing and margin logic','Cost structure','Licensing and partnerships','Revenue architecture'],detail:'Design of licensing, partnership and collaboration structures as integrated revenue drivers.',s:['Pricing','Margin logic','Partnerships','Revenue architecture']}
];
/* Areas of the One Operating System (canonical taxonomy, Lena 27.09.2026). d = the dimensions an area belongs to (0 Proposition, 1 Expansion, 2 Operations, 3 Commercial Architecture);
   two dimensions = a connecting area. The first eight keep their order, because the Complexity chapter places one block per area in this order. Areas without content yet are shells (no k) */
const REAL=[
 {n:'Markets',slug:'markets',d:[1],k:'The real market environment a business operates in. Lena reads market conditions, adapts positioning and builds the partner and execution structures to act on them.',
  fig:['37','Markets'],list:['Europe','Middle East','Asia'],detail:'International expansion and market positioning across Europe, Middle East and Asia.',rel:'Markets is the environment. Expansion is how Lena works with it.'},
 {n:'Advantage',slug:'advantage',d:[0],rel:'Advantage belongs to Proposition.'},
 {n:'Technology',slug:'technology',d:[2],k:'Technology and AI give the business operating leverage: faster research, better decisions, cleaner workflows and quality control, with people making the calls.',
  groups:[['Better decisions',['Research','Analysis','Human decision gates']],['Stronger knowledge',['Knowledge management','Single source of truth governance']],['Cleaner execution',['Workflow design','QA','Automation','Multi-system orchestration']]],
  detail:'A practical operating and decision-support layer within strategic operations, operating models and transformation. Not a separate specialism.',rel:'Technology works through Operations.'},
 {n:'Delivery',slug:'delivery',d:[2,3],k:'Getting from plan to delivery: production, distribution and supply chain aligned with commercial objectives and growth.',
  list:['Production','Delivery','Distribution','Supply chain','Execution'],detail:'Operations designs the structure. Production is where it has to deliver.',rel:'Delivery connects Operations to Commercial Architecture.'},
 {n:'Positioning',slug:'positioning',d:[0,1],k:'Where a business stands in its market and why it is chosen. Lena sharpens positioning and differentiation so proposition and expansion pull in the same direction.',
  list:['Positioning','Differentiation','Market positioning'],rel:'Positioning connects Proposition to Expansion.'},
 {n:'Customers',slug:'customers',d:[3],k:'The customers a business needs to win and keep. Lena connects positioning, experience, pricing and conversion to the people the business serves.',
  list:['Conversion','Pricing','Experience','Partnerships','Collaborations'],rel:'Customers belong to Commercial Architecture.'},
 {n:'Revenue',slug:'revenue',d:[3],k:'The commercial reality every decision has to hold up against: pricing, margins and revenue models.',
  fig:['€1M to €15M+','Budget environments'],list:['Pricing','Margins','Cost structure','Revenue models','Revenue streams'],rel:'Revenue belongs to Commercial Architecture.'},
 {n:'People',slug:'people',d:[2],k:'Organisations only change when people can carry the change. Lena structures teams, clarifies responsibilities and strengthens leadership so execution and transformation hold.',
  fig:['10 to 80+','Teams'],list:['Team structure','Responsibilities','Leadership','Execution','Transformation'],rel:'People belong to Operations.'},
 {n:'Decisions',slug:'decisions',d:[2],rel:'Decisions belong to Operations.'},
 {n:'Partnerships',slug:'partnerships',d:[3],rel:'Partnerships belong to Commercial Architecture.'}
];
const RI=n=>REAL.findIndex(r=>r.n===n);
/* the system in reading order, as the Connected System navigation shows it: each dimension with its areas, the connecting areas between */
const SYS=[{d:0,a:['Advantage']},{c:'Positioning'},{d:1,a:['Markets']},{d:2,a:['People','Technology','Decisions']},{c:'Delivery'},{d:3,a:['Revenue','Customers','Partnerships']}];
const ORDER=SYS.flatMap(g=>g.c?[g.c]:g.a);
/* addresses (Lena, 28.09.2026): numbers belong to the website (chapters 01 to 08, layers 04.1 ...), letters to the operating system.
   A to D are the dimensions, A.1 or C.2 their areas in reading order, A + B and C + D the two connecting areas. A later layer continues as B.1.1 */
const DL='ABCD';
const ADDR=(type,i)=>{if(type!=='real')return DL[i];const o=REAL[i];if(o.d.length>1)return o.d.map(k=>DL[k]).join(' + ');const k=o.d[0];return DL[k]+'.'+(SYS.find(x=>x.d===k).a.indexOf(o.n)+1)};
return{DIMS,REAL,SYS,DL,RI,ADDR}})();
