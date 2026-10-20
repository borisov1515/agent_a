"""Create local, editable SVG illustrations for benefits and license scope."""
from pathlib import Path

out = Path(__file__).resolve().parents[1] / "public" / "assets"
defs = '''<defs><linearGradient id="blue" x2="1" y2="1"><stop stop-color="#3a74ef"/><stop offset="1" stop-color="#204cbf"/></linearGradient><filter id="shadow" x="-30%" y="-30%" width="170%" height="180%"><feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#234a83" flood-opacity=".13"/></filter><pattern id="grid" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#bdcee6"/></pattern></defs>'''
def save(name, body):
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 320">{defs}<rect width="520" height="320" fill="#edf4ff"/><rect width="520" height="320" fill="url(#grid)" opacity=".45"/><g font-family="Arial, sans-serif">{body}</g></svg>'
    (out / f"{name}.svg").write_text(svg, encoding="utf-8")

save("benefit-answer", '''
<g transform="translate(75 60) rotate(-9 80 90)" filter="url(#shadow)"><rect width="150" height="190" rx="9" fill="#e5edfa" stroke="#bacde8"/><rect x="12" y="-9" width="150" height="190" rx="9" fill="white" stroke="#c2d4ed"/><path d="M38 28h65M38 49h95M38 70h75M38 93h95M38 115h63M38 138h85" stroke="#c5d4e8" stroke-width="4" stroke-linecap="round"/><path d="M38 93h95" stroke="#5786eb" stroke-width="7" opacity=".55"/></g>
<path d="M222 135h43q15 0 15 15v12" fill="none" stroke="#7299de" stroke-width="2" stroke-dasharray="5 5"/>
<g filter="url(#shadow)"><rect x="239" y="103" width="224" height="153" rx="13" fill="white" stroke="#bfd1ed"/><rect x="255" y="121" width="124" height="26" rx="13" fill="#eaf1ff"/><text x="270" y="139" fill="#2859d9" font-size="12" font-weight="bold">Payment terms?</text><text x="257" y="177" fill="#132d42" font-size="21" font-weight="bold">Answer + source</text><path d="M257 195h179" stroke="#d9e4f3"/><circle cx="268" cy="224" r="11" fill="#2859d9"/><path d="m263 224 3 3 7-7" stroke="white" stroke-width="2" fill="none"/><text x="288" y="229" fill="#506579" font-size="13">Check the original</text></g>
<circle cx="407" cy="73" r="34" fill="url(#blue)" filter="url(#shadow)"/><circle cx="403" cy="70" r="11" stroke="white" stroke-width="3" fill="none"/><path d="m411 78 9 9" stroke="white" stroke-width="3" stroke-linecap="round"/>
''')
save("benefit-deal", '''
<path d="M250 150 116 80M250 150 420 82M250 150 407 253M250 150 116 250" stroke="#9db9e7" stroke-width="2"/>
<g fill="white" stroke="#b9ceec" filter="url(#shadow)"><rect x="195" y="89" width="116" height="133" rx="12"/><rect x="61" y="40" width="103" height="73" rx="10"/><rect x="367" y="37" width="103" height="73" rx="10"/><rect x="65" y="219" width="103" height="73" rx="10"/></g>
<g fill="#132d42" font-size="13" text-anchor="middle"><text x="113" y="87">Contract</text><text x="418" y="84">Invoice</text><text x="117" y="268">Email</text></g>
<g fill="#2859d9"><circle cx="113" cy="59" r="11"/><circle cx="418" cy="56" r="11"/><circle cx="117" cy="240" r="11"/></g><g stroke="white" stroke-width="2" fill="none"><path d="m108 59 3 3 7-7M413 56l3 3 7-7M112 240l3 3 7-7"/></g>
<rect x="215" y="107" width="76" height="64" rx="10" fill="url(#blue)"/><path d="m236 129 17-9 17 9-17 9zM236 139l17 9 17-9" fill="none" stroke="white" stroke-width="2"/><text x="253" y="199" text-anchor="middle" font-size="17" font-weight="bold" fill="#132d42">Your deal</text>
<rect x="356" y="215" width="121" height="79" rx="10" fill="#fff7e4" stroke="#b98b2e" stroke-dasharray="5 4"/><circle cx="416" cy="237" r="11" fill="#93651a"/><text x="416" y="242" text-anchor="middle" font-size="15" font-weight="bold" fill="white">!</text><text x="416" y="269" text-anchor="middle" font-size="14" font-weight="bold" fill="#77500f">Missing file</text>
''')
save("benefit-approval", '''
<g filter="url(#shadow)"><rect x="63" y="62" width="278" height="196" rx="14" fill="white" stroke="#bfd1ed"/><rect x="83" y="82" width="122" height="24" rx="12" fill="#eef3fb"/><text x="98" y="98" font-size="11" fill="#506579" font-weight="bold">CRM PROPOSAL</text><text x="84" y="139" font-size="22" fill="#132d42" font-weight="bold">Ready for review.</text><path d="M84 161h229M84 180h150" stroke="#cfdbec" stroke-width="4" stroke-linecap="round"/><rect x="83" y="204" width="234" height="33" rx="16" fill="url(#blue)"/><text x="200" y="226" text-anchor="middle" font-size="14" font-weight="bold" fill="white">Review → Accept</text></g>
<path d="M343 156h29" stroke="#7da0d9" stroke-width="2" stroke-dasharray="4 4"/><circle cx="412" cy="157" r="51" fill="url(#blue)" filter="url(#shadow)"/><circle cx="412" cy="143" r="11" stroke="white" stroke-width="3" fill="none"/><path d="M390 178v-3a22 22 0 0 1 44 0v3" stroke="white" stroke-width="3" fill="none"/><rect x="372" y="221" width="80" height="27" rx="13" fill="white" stroke="#c4d4ec"/><text x="412" y="240" text-anchor="middle" font-size="13" font-weight="bold" fill="#2859d9">Your call.</text>
''')
save("license-single", '''
<ellipse cx="260" cy="278" rx="143" ry="14" fill="#dce7f7"/>
<g filter="url(#shadow)"><rect x="115" y="54" width="290" height="188" rx="13" fill="#18334f"/><rect x="125" y="64" width="270" height="157" rx="5" fill="white"/><rect x="151" y="88" width="84" height="109" rx="6" fill="#edf3fc" stroke="#c9d8ed"/><path d="M169 111h47M169 128h47M169 145h30M169 162h41" stroke="#b2c7e6" stroke-width="3" stroke-linecap="round"/><rect x="263" y="100" width="89" height="77" rx="17" fill="url(#blue)"/><text x="307" y="150" text-anchor="middle" fill="white" font-size="38" font-weight="bold">A</text><path d="M237 145h24" stroke="#87a8dc" stroke-width="2"/><path d="M240 242v22h-37v10h114v-10h-37v-22" fill="#a9bfdc"/></g>
<rect x="175" y="16" width="170" height="28" rx="14" fill="white" stroke="#c7d7ed"/><text x="260" y="35" text-anchor="middle" fill="#2859d9" font-size="12" font-weight="bold">ONE COMPUTER</text>
''')
save("license-company", '''
<path d="M260 131v33H99v35M260 164v35M260 164h161v35" stroke="#9ab7e3" stroke-width="2" fill="none"/>
<g filter="url(#shadow)"><rect x="195" y="44" width="130" height="93" rx="15" fill="url(#blue)"/><text x="260" y="94" text-anchor="middle" fill="white" font-size="35" font-weight="bold">A</text><text x="260" y="119" text-anchor="middle" fill="white" font-size="11">COMPANY HOST</text></g>
<g fill="white" stroke="#b6cbe8" stroke-width="2" filter="url(#shadow)"><rect x="53" y="200" width="92" height="60" rx="6"/><rect x="214" y="200" width="92" height="60" rx="6"/><rect x="375" y="200" width="92" height="60" rx="6"/></g><g fill="#9fb7d9"><path d="M43 262h112l-9 9H52zM204 262h112l-9 9h-94zM365 262h112l-9 9h-94z"/></g><g fill="#2859d9"><circle cx="99" cy="222" r="7"/><circle cx="260" cy="222" r="7"/><circle cx="421" cy="222" r="7"/></g><g fill="none" stroke="#2859d9" stroke-width="2"><path d="M85 244a14 14 0 0 1 28 0M246 244a14 14 0 0 1 28 0M407 244a14 14 0 0 1 28 0"/></g>
<rect x="162" y="9" width="196" height="25" rx="12" fill="white" stroke="#c7d7ed"/><text x="260" y="26" text-anchor="middle" fill="#2859d9" font-size="11" font-weight="bold">ONE COMPANY · SHARED AI</text>
''')
save("benefit-review", '''
<g filter="url(#shadow)"><rect x="101" y="41" width="207" height="240" rx="10" fill="white" stroke="#bfd1ed"/><text x="125" y="80" fill="#132d42" font-size="18" font-weight="bold">Your document</text><path d="M126 105h157M126 127h131M126 150h157M126 174h148M126 197h157M126 220h119" stroke="#c5d4e8" stroke-width="4" stroke-linecap="round"/><path d="M126 150h157M126 174h148" stroke="#759aeb" stroke-width="9" opacity=".35"/></g>
<path d="m281 139 47-34 25 29-46 37-35 6z" fill="url(#blue)"/><path d="m272 177 10-38 25 32z" fill="#abc3ef"/><rect x="279" y="217" width="177" height="48" rx="12" fill="#2859d9" filter="url(#shadow)"/><text x="367" y="247" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Review the detail.</text>
''')
save("benefit-export", '''
<g filter="url(#shadow)"><rect x="61" y="71" width="141" height="181" rx="10" fill="white" stroke="#bfd1ed"/><text x="132" y="111" text-anchor="middle" fill="#506579" font-size="14">Original</text><path d="M83 138h98M83 160h74M83 182h98M83 204h87" stroke="#c5d4e8" stroke-width="4" stroke-linecap="round"/><rect x="310" y="71" width="149" height="181" rx="10" fill="white" stroke="#93b0e1"/><text x="384" y="111" text-anchor="middle" fill="#2859d9" font-size="14" font-weight="bold">New version</text><path d="M332 138h105M332 160h91M332 182h105M332 204h78" stroke="#7b9ee6" stroke-width="4" stroke-linecap="round"/></g><path d="M219 161h68m-11-11 11 11-11 11" stroke="#2859d9" stroke-width="3" stroke-linecap="round" fill="none"/><rect x="180" y="221" width="161" height="47" rx="23" fill="url(#blue)" filter="url(#shadow)"/><path d="m202 245 5 5 10-11" stroke="white" stroke-width="2" fill="none"/><text x="267" y="251" text-anchor="middle" fill="white" font-size="15" font-weight="bold">You confirm.</text>
''')
print("Created 7 benefit and license illustrations.")
