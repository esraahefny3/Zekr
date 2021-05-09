 // const url = "http://www.whateverorigin.org/get?url=" + encodeURIComponent(child.val()["ajax-url"]) + "&callback=?";

 let countriesUrlsStorageKey = 'countries-urls';

 function makecountriesUrls() {
   let countriesUrls = {
     'AD': 'https://www.islamicfinder.org/prayer-widget/3041563/shafi/1/0/18.0/17.0',
     'AE': 'https://www.islamicfinder.org/prayer-widget/292968/shafi/4/0/18.5/19.0',
     'AF': 'https://www.islamicfinder.org/prayer-widget/1138958/shafi/3/0/18.0/18.0',
     'AG': 'https://www.islamicfinder.org/prayer-widget/40267052/shafi/1/0/18.0/17.0',
     'AI': 'https://www.islamicfinder.org/prayer-widget/3573374/shafi/1/0/18.0/17.0',
     'AL': 'https://www.islamicfinder.org/prayer-widget/40152353/shafi/1/0/18.0/17.0',
     'AM': 'https://www.islamicfinder.org/prayer-widget/616052/shafi/1/0/18.0/17.0',
     'AO': 'https://www.islamicfinder.org/prayer-widget/2240449/shafi/1/0/18.0/17.0',
     'AR': 'https://www.islamicfinder.org/prayer-widget/3435910/shafi/1/0/18.0/17.0',
     'AS': 'https://www.islamicfinder.org/prayer-widget/5881576/shafi/1/0/18.0/17.0',
     'AT': 'https://www.islamicfinder.org/prayer-widget/2761369/shafi/1/0/18.0/17.0',
     'AU': 'https://www.islamicfinder.org/prayer-widget/2172517/shafi/1/0/18.0/17.0',
     'AW': 'https://www.islamicfinder.org/prayer-widget/3577154/shafi/1/0/18.0/17.0',
     'AX': 'https://www.islamicfinder.org/prayer-widget/3041732/shafi/1/0/18.0/17.0',
     'AZ': 'https://www.islamicfinder.org/prayer-widget/587084/shafi/1/0/18.0/17.0',
     'BA': 'https://www.islamicfinder.org/prayer-widget/3191281/shafi/1/0/18.0/17.0',
     'BB': 'https://www.islamicfinder.org/prayer-widget/3374036/shafi/1/0/18.0/17.0',
     'BD': 'https://www.islamicfinder.org/prayer-widget/1185241/shafi/3/0/18.0/18.0',
     'BE': 'https://www.islamicfinder.org/prayer-widget/2800866/shafi/1/0/18.0/17.0',
     'BF': 'https://www.islamicfinder.org/prayer-widget/2357048/shafi/1/0/18.0/17.0',
     'BG': 'https://www.islamicfinder.org/prayer-widget/727011/shafi/1/0/18.0/17.0',
     'BH': 'https://www.islamicfinder.org/prayer-widget/290340/shafi/4/0/18.5/19.0',
     'BI': 'https://www.islamicfinder.org/prayer-widget/41025476/shafi/1/0/18.0/17.0',
     'BJ': 'https://www.islamicfinder.org/prayer-widget/2392087/shafi/1/0/18.0/17.0',
     'BL': 'https://www.islamicfinder.org/prayer-widget/3579132/shafi/1/0/18.0/17.0',
     'BN': 'https://www.islamicfinder.org/prayer-widget/1820906/shafi/1/0/18.0/17.0',
     'BM': 'https://www.islamicfinder.org/prayer-widget/3573197/shafi/1/0/18.0/17.0',
     'BO': 'https://www.islamicfinder.org/prayer-widget/3903987/shafi/1/0/18.0/17.0',
     'BQ': 'https://www.islamicfinder.org/prayer-widget/3513563/shafi/1/0/18.0/17.0',
     'BR': 'https://www.islamicfinder.org/prayer-widget/3469058/shafi/1/0/18.0/17.0',
     'BS': 'https://www.islamicfinder.org/prayer-widget/3571824/shafi/1/0/18.0/17.0',
     'BT': 'https://www.islamicfinder.org/prayer-widget/1252416/shafi/1/0/18.0/17.0',
     'BV': 'nil',
     'BW': 'https://www.islamicfinder.org/prayer-widget/933773/shafi/1/0/18.0/17.0',
     'BY': 'https://www.islamicfinder.org/prayer-widget/625144/shafi/1/0/18.0/17.0',
     'BZ': 'https://www.islamicfinder.org/prayer-widget/3582672/shafi/1/0/18.0/17.0',
     'CA': 'https://www.islamicfinder.org/prayer-widget/6094817/shafi/5/0/15.0/15.0',
     'CC': 'https://www.islamicfinder.org/prayer-widget/42204197/shafi/1/0/18.0/17.0',
     'CD': 'https://www.islamicfinder.org/prayer-widget/2314302/shafi/1/0/18.0/17.0',
     'CF': 'https://www.islamicfinder.org/prayer-widget/2389853/shafi/1/0/18.0/17.0',
     'CG': 'https://www.islamicfinder.org/prayer-widget/2260535/shafi/1/0/18.0/17.0',
     'CH': 'https://www.islamicfinder.org/prayer-widget/2659896/shafi/1/0/18.0/17.0',
     'CI': 'https://www.islamicfinder.org/prayer-widget/2293538/shafi/1/0/18.0/17.0',
     'CI': 'https://www.islamicfinder.org/prayer-widget/4035715/shafi/1/0/18.0/17.0',
     'CL': 'https://www.islamicfinder.org/prayer-widget/3871336/shafi/1/0/18.0/17.0',
     'CM': 'https://www.islamicfinder.org/prayer-widget/2220957/shafi/1/0/18.0/17.0',
     'CN': 'https://www.islamicfinder.org/prayer-widget/1816670/shafi/1/0/18.0/17.0',
     'CO': 'https://www.islamicfinder.org/prayer-widget/3688689/shafi/1/0/18.0/17.0',
     'CR': 'https://www.islamicfinder.org/prayer-widget/3621849/shafi/1/0/18.0/17.0',
     'CU': 'https://www.islamicfinder.org/prayer-widget/3553478/shafi/1/0/18.0/17.0',
     'CV': 'https://www.islamicfinder.org/prayer-widget/41891870/shafi/1/0/18.0/17.0',
     'CW': 'https://www.islamicfinder.org/prayer-widget/3513090/shafi/1/0/18.0/17.0',
     'CX': 'https://www.islamicfinder.org/prayer-widget/2078127/shafi/1/0/18.0/17.0',
     'CY': 'https://www.islamicfinder.org/prayer-widget/146268/shafi/1/0/18.0/17.0',
     'CZ': 'https://www.islamicfinder.org/prayer-widget/3067696/shafi/1/0/18.0/17.0',
     'DE': 'https://www.islamicfinder.org/prayer-widget/2950159/shafi/1/0/18.0/17.0',
     'DJ': 'https://www.islamicfinder.org/prayer-widget/223816/shafi/1/0/18.0/17.0',
     'DK': 'https://www.islamicfinder.org/prayer-widget/2618425/shafi/1/0/18.0/17.0',
     'DM': 'https://www.islamicfinder.org/prayer-widget/3575635/shafi/1/0/18.0/17.0',
     'DO': 'https://www.islamicfinder.org/prayer-widget/3492908/shafi/1/0/18.0/17.0',
     'DZ': 'https://www.islamicfinder.org/prayer-widget/2507480/shafi/15/0/18.0/17.0',
     'EC': 'https://www.islamicfinder.org/prayer-widget/3652462/shafi/1/0/18.0/17.0',
     'EE': 'https://www.islamicfinder.org/prayer-widget/588409/shafi/1/0/18.0/17.0',
     'EG': 'https://www.islamicfinder.org/prayer-widget/360630/shafi/2/0/19.5/17.5',
     'EH': 'https://www.islamicfinder.org/prayer-widget/44923599/shafi/1/0/18.0/17.0',
     'ER': 'https://www.islamicfinder.org/prayer-widget/343300/shafi/1/0/18.0/17.0',
     'ES': 'https://www.islamicfinder.org/prayer-widget/3117735/shafi/1/0/18.0/17.0',
     'ET': 'https://www.islamicfinder.org/prayer-widget/344979/shafi/1/0/18.0/17.0',
     'FI': 'https://www.islamicfinder.org/prayer-widget/658225/shafi/1/0/18.0/17.0',
     'FJ': 'https://www.islamicfinder.org/prayer-widget/2198148/shafi/1/0/18.0/17.0',
     'FK': 'https://www.islamicfinder.org/prayer-widget/3426691/shafi/1/0/18.0/17.0',
     'FM': 'https://www.islamicfinder.org/prayer-widget/47882892/shafi/5/0/15.0/15.0',
     'FO': 'https://www.islamicfinder.org/prayer-widget/2611396/shafi/1/0/18.0/17.0',
     'FR': 'https://www.islamicfinder.org/prayer-widget/2988507/shafi/8/0/12.0/12.0',
     'GA': 'https://www.islamicfinder.org/prayer-widget/2399697/shafi/1/0/18.0/17.0',
     'GB': 'https://www.islamicfinder.org/prayer-widget/2643743/shafi/1/0/18.0/17.0',
     'GE': 'https://www.islamicfinder.org/prayer-widget/611717/shafi/1/0/18.0/17.0',
     'GD': 'https://www.islamicfinder.org/prayer-widget/43312871/shafi/1/0/18.0/17.0',
     'GF': 'https://www.islamicfinder.org/prayer-widget/42960132/shafi/1/0/18.0/17.0',
     'GG': 'https://www.islamicfinder.org/prayer-widget/43350275/shafi/1/0/18.0/17.0',
     'GH': 'https://www.islamicfinder.org/prayer-widget/2306104/shafi/1/0/18.0/17.0',
     'GI': 'https://www.islamicfinder.org/prayer-widget/43229852/shafi/1/0/18.0/17.0',
     'GL': 'https://www.islamicfinder.org/prayer-widget/3421319/shafi/1/0/18.0/17.0',
     'GM': 'https://www.islamicfinder.org/prayer-widget/2413876/shafi/1/0/18.0/17.0',
     'GN': 'https://www.islamicfinder.org/prayer-widget/2422465/shafi/1/0/18.0/17.0',
     'GO': 'nil',
     'GP': 'https://www.islamicfinder.org/prayer-widget/3579732/shafi/1/0/18.0/17.0',
     'GQ': 'https://www.islamicfinder.org/prayer-widget/2309527/shafi/1/0/18.0/17.0',
     'GR': 'https://www.islamicfinder.org/prayer-widget/264371/shafi/1/0/18.0/17.0',
     'GS': 'https://www.islamicfinder.org/prayer-widget/46827656/shafi/1/0/18.0/17.0',
     'GS': 'https://www.islamicfinder.org/prayer-widget/43323282/shafi/1/0/18.0/17.0',
     'GU': 'https://www.islamicfinder.org/prayer-widget/4044012/shafi/1/0/18.0/17.0',
     'GW': 'https://www.islamicfinder.org/prayer-widget/2374775/shafi/1/0/18.0/17.0',
     'GY': 'https://www.islamicfinder.org/prayer-widget/3378644/shafi/1/0/18.0/17.0',
     'HK': 'https://www.islamicfinder.org/prayer-widget/43457537/shafi/1/0/18.0/17.0',
     'HM': 'nil',
     'HN': 'https://www.islamicfinder.org/prayer-widget/3600949/shafi/1/0/18.0/17.0',
     'HR': 'https://www.islamicfinder.org/prayer-widget/3186886/shafi/1/0/18.0/17.0',
     'HT': 'https://www.islamicfinder.org/prayer-widget/3718426/shafi/1/0/18.0/17.0',
     'HU': 'https://www.islamicfinder.org/prayer-widget/3054643/shafi/1/0/18.0/17.0',
     'ID': 'nil',
     'IE': 'https://www.islamicfinder.org/prayer-widget/2964574/shafi/1/0/18.0/17.0',
     'IL': 'https://www.islamicfinder.org/prayer-widget/281184/shafi/1/0/18.0/17.0',
     'IM': 'https://www.islamicfinder.org/prayer-widget/3042237/shafi/1/0/18.0/17.0',
     'IN': 'https://www.islamicfinder.org/prayer-widget/1261481/shafi/3/0/18.0/18.0',
     'IO': 'nil',
     'IQ': 'https://www.islamicfinder.org/prayer-widget/98182/shafi/1/0/18.0/17.0',
     'IR': 'https://www.islamicfinder.org/prayer-widget/40000001/shafi/1/0/18.0/17.0',
     'IS': 'https://www.islamicfinder.org/prayer-widget/3413829/shafi/1/0/18.0/17.0',
     'IT': 'https://www.islamicfinder.org/prayer-widget/3169070/shafi/1/0/18.0/17.0',
     'JE': 'https://www.islamicfinder.org/prayer-widget/3042091/shafi/1/0/18.0/17.0',
     'JM': 'https://www.islamicfinder.org/prayer-widget/3489854/shafi/1/0/18.0/17.0',
     'JO': 'https://www.islamicfinder.org/prayer-widget/250441/shafi/4/0/18.5/19.0',
     'JP': 'https://www.islamicfinder.org/prayer-widget/1850147/shafi/1/0/18.0/17.0',
     'JU': 'nil',
     'KE': 'https://www.islamicfinder.org/prayer-widget/184745/shafi/1/0/18.0/17.0',
     'KG': 'https://www.islamicfinder.org/prayer-widget/1528675/shafi/1/0/18.0/17.0',
     'KH': 'https://www.islamicfinder.org/prayer-widget/1821306/shafi/1/0/18.0/17.0',
     'KI': 'https://www.islamicfinder.org/prayer-widget/44241091/shafi/1/0/18.0/17.0',
     'KM': 'https://www.islamicfinder.org/prayer-widget/921772/shafi/1/0/18.0/17.0',
     'KN': 'https://www.islamicfinder.org/prayer-widget/3575551/shafi/1/0/18.0/17.0',
     'KP': 'https://www.islamicfinder.org/prayer-widget/1871859/shafi/1/0/18.0/17.0',
     'KR': 'https://www.islamicfinder.org/prayer-widget/1835848/shafi/1/0/18.0/17.0',
     'XK': 'https://www.islamicfinder.org/prayer-widget/786714/shafi/1/0/18.0/17.0',
     'KW': 'https://www.islamicfinder.org/prayer-widget/285787/shafi/4/0/18.5/19.0',
     'KY': 'https://www.islamicfinder.org/prayer-widget/3580661/shafi/1/0/18.0/17.0',
     'KZ': 'https://www.islamicfinder.org/prayer-widget/1526273/shafi/1/0/18.0/17.0',
     'LA': 'https://www.islamicfinder.org/prayer-widget/1651944/shafi/1/0/18.0/17.0',
     'LB': 'https://www.islamicfinder.org/prayer-widget/276781/shafi/1/0/18.0/17.0',
     'LC': 'https://www.islamicfinder.org/prayer-widget/3576812/shafi/1/0/18.0/17.0',
     'LI': 'https://www.islamicfinder.org/prayer-widget/3042030/shafi/1/0/18.0/17.0',
     'LK': 'https://www.islamicfinder.org/prayer-widget/46989860/shafi/1/0/18.0/17.0',
     'LR': 'https://www.islamicfinder.org/prayer-widget/2274895/shafi/1/0/18.0/17.0',
     'LS': 'https://www.islamicfinder.org/prayer-widget/932505/shafi/1/0/18.0/17.0',
     'LT': 'https://www.islamicfinder.org/prayer-widget/593116/shafi/1/0/18.0/17.0',
     'LU': 'https://www.islamicfinder.org/prayer-widget/2960313/shafi/1/0/18.0/17.0',
     'GU': 'https://www.islamicfinder.org/prayer-widget/456172/shafi/1/0/18.0/17.0',
     'LY': 'https://www.islamicfinder.org/prayer-widget/2210247/shafi/2/0/19.5/17.5',
     'MA': 'https://www.islamicfinder.org/prayer-widget/2538475/shafi/1/0/18.0/17.0',
     'MC': 'https://www.islamicfinder.org/prayer-widget/2992741/shafi/1/0/18.0/17.0',
     'MD': 'https://www.islamicfinder.org/prayer-widget/618426/shafi/1/0/18.0/17.0',
     'GU': 'https://www.islamicfinder.org/prayer-widget/1070940/shafi/1/0/18.0/17.0',
     'ME': 'https://www.islamicfinder.org/prayer-widget/3193044/shafi/1/0/18.0/17.0',
     'MF': 'https://www.islamicfinder.org/prayer-widget/3513392/shafi/1/0/18.0/17.0',
     'MH': 'https://www.islamicfinder.org/prayer-widget/44663158/shafi/1/0/18.0/17.0',
     'MK': 'https://www.islamicfinder.org/prayer-widget/785842/shafi/1/0/18.0/17.0',
     'ML': 'https://www.islamicfinder.org/prayer-widget/2460596/shafi/1/0/18.0/17.0',
     'MO': 'https://www.islamicfinder.org/prayer-widget/44464970/shafi/1/0/18.0/17.0',
     'MM': 'https://www.islamicfinder.org/prayer-widget/40981850/shafi/1/0/18.0/17.0',
     'MN': 'https://www.islamicfinder.org/prayer-widget/44842676/shafi/1/0/18.0/17.0',
     'MP': 'https://www.islamicfinder.org/prayer-widget/7828758/shafi/1/0/18.0/17.0',
     'MQ': 'https://www.islamicfinder.org/prayer-widget/3570675/shafi/1/0/18.0/17.0',
     'MR': 'https://www.islamicfinder.org/prayer-widget/2377450/shafi/1/0/18.0/17.0',
     'MS': 'https://www.islamicfinder.org/prayer-widget/3578069/shafi/1/0/18.0/17.0',
     'MT': 'https://www.islamicfinder.org/prayer-widget/2562305/shafi/1/0/18.0/17.0',
     'MU': 'https://www.islamicfinder.org/prayer-widget/934154/shafi/1/0/18.0/17.0',
     'MV': 'https://www.islamicfinder.org/prayer-widget/1282027/shafi/1/0/18.0/17.0',
     'MW': 'https://www.islamicfinder.org/prayer-widget/927967/shafi/1/0/18.0/17.0',
     'MX': 'https://www.islamicfinder.org/prayer-widget/3530597/shafi/1/0/18.0/17.0',
     'MY': 'https://www.islamicfinder.org/prayer-widget/1735161/shafi/13/0/20.0/18.0',
     'MZ': 'https://www.islamicfinder.org/prayer-widget/1040652/shafi/1/0/18.0/17.0',
     'NA': 'https://www.islamicfinder.org/prayer-widget/3352136/shafi/1/0/18.0/17.0',
     'NC': 'https://www.islamicfinder.org/prayer-widget/2139521/shafi/1/0/18.0/17.0',
     'NE': 'https://www.islamicfinder.org/prayer-widget/2440485/shafi/1/0/18.0/17.0',
     'NF': 'https://www.islamicfinder.org/prayer-widget/2161314/shafi/1/0/18.0/17.0',
     'NG': 'https://www.islamicfinder.org/prayer-widget/2352778/shafi/2/0/19.5/17.5',
     'NI': 'https://www.islamicfinder.org/prayer-widget/3617763/shafi/1/0/18.0/17.0',
     'NL': 'https://www.islamicfinder.org/prayer-widget/2759794/shafi/1/0/18.0/17.0',
     'NO': 'https://www.islamicfinder.org/prayer-widget/3143244/shafi/1/0/18.0/17.0',
     'NP': 'https://www.islamicfinder.org/prayer-widget/1283240/shafi/1/0/18.0/17.0',
     'NR': 'https://www.islamicfinder.org/prayer-widget/45072491/shafi/1/0/18.0/17.0',
     'NU': 'https://www.islamicfinder.org/prayer-widget/4036284/shafi/1/0/18.0/17.0',
     'NZ': 'https://www.islamicfinder.org/prayer-widget/2179537/shafi/1/0/18.0/17.0',
     'OM': 'https://www.islamicfinder.org/prayer-widget/287286/shafi/4/0/18.5/19.0',
     'PA': 'https://www.islamicfinder.org/prayer-widget/3703443/shafi/1/0/18.0/17.0',
     'PE': 'https://www.islamicfinder.org/prayer-widget/3936456/shafi/1/0/18.0/17.0',
     'PF': 'https://www.islamicfinder.org/prayer-widget/4033936/shafi/1/0/18.0/17.0',
     'PG': 'https://www.islamicfinder.org/prayer-widget/2088122/shafi/1/0/18.0/17.0',
     'PH': 'https://www.islamicfinder.org/prayer-widget/1701668/shafi/1/0/18.0/17.0',
     'PK': 'https://www.islamicfinder.org/prayer-widget/1176615/hanfi/3/0/18.0/18.0',
     'PL': 'https://www.islamicfinder.org/prayer-widget/756135/shafi/1/0/18.0/17.0',
     'PM': 'https://www.islamicfinder.org/prayer-widget/3424934/shafi/1/0/18.0/17.0',
     'PN': 'https://www.islamicfinder.org/prayer-widget/4030723/shafi/1/0/18.0/17.0',
     'PR': 'https://www.islamicfinder.org/prayer-widget/4568127/shafi/1/0/18.0/17.0',
     'PS': 'https://www.islamicfinder.org/prayer-widget/282239/shafi/1/0/18.0/17.0',
     'PT': 'https://www.islamicfinder.org/prayer-widget/2267057/shafi/1/0/18.0/17.0',
     'PW': 'https://www.islamicfinder.org/prayer-widget/45641486/shafi/1/0/18.0/17.0',
     'PY': 'https://www.islamicfinder.org/prayer-widget/3439389/shafi/1/0/18.0/17.0',
     'QA': 'https://www.islamicfinder.org/prayer-widget/290030/shafi/4/0/18.5/19.0',
     'RE': 'https://www.islamicfinder.org/prayer-widget/935264/shafi/1/0/18.0/17.0',
     'RO': 'https://www.islamicfinder.org/prayer-widget/683506/shafi/1/0/18.0/17.0',
     'RS': 'https://www.islamicfinder.org/prayer-widget/792680/shafi/1/0/18.0/17.0',
     'RU': 'https://www.islamicfinder.org/prayer-widget/524901/shafi/14/0/16.0/15.0',
     'RW': 'https://www.islamicfinder.org/prayer-widget/202061/shafi/1/0/18.0/17.0',
     'SA': 'https://www.islamicfinder.org/prayer-widget/108410/shafi/4/0/18.5/19.0',
     'SB': 'https://www.islamicfinder.org/prayer-widget/2108502/shafi/1/0/18.0/17.0',
     'SC': 'https://www.islamicfinder.org/prayer-widget/241131/shafi/1/0/18.0/17.0',
     'SD': 'https://www.islamicfinder.org/prayer-widget/379252/shafi/2/0/19.5/17.5',
     'SE': 'https://www.islamicfinder.org/prayer-widget/2673730/shafi/1/0/18.0/17.0',
     'SG': 'https://www.islamicfinder.org/prayer-widget/1880251/shafi/9/0/20.0/18.0',
     'SH': 'https://www.islamicfinder.org/prayer-widget/46515051/shafi/1/0/18.0/17.0',
     'SI': 'https://www.islamicfinder.org/prayer-widget/3196359/shafi/1/0/18.0/17.0',
     'SJ': 'https://www.islamicfinder.org/prayer-widget/2729907/shafi/1/0/18.0/17.0',
     'SK': 'https://www.islamicfinder.org/prayer-widget/3060972/shafi/1/0/18.0/17.0',
     'SL': 'https://www.islamicfinder.org/prayer-widget/2409306/shafi/1/0/18.0/17.0',
     'SM': 'https://www.islamicfinder.org/prayer-widget/3177564/shafi/1/0/18.0/17.0',
     'SN': 'https://www.islamicfinder.org/prayer-widget/2253354/shafi/1/0/18.0/17.0',
     'SO': 'https://www.islamicfinder.org/prayer-widget/53654/shafi/1/0/18.0/17.0',
     'SR': 'https://www.islamicfinder.org/prayer-widget/3383330/shafi/1/0/18.0/17.0',
     'SS': 'https://www.islamicfinder.org/prayer-widget/373303/shafi/1/0/18.0/17.0',
     'ST': 'https://www.islamicfinder.org/prayer-widget/2410763/shafi/1/0/18.0/17.0',
     'SV': 'https://www.islamicfinder.org/prayer-widget/3583361/shafi/1/0/18.0/17.0',
     'SX': 'https://www.islamicfinder.org/prayer-widget/3578851/shafi/1/0/18.0/17.0',
     'SY': 'https://www.islamicfinder.org/prayer-widget/170654/shafi/4/0/18.5/19.0',
     'SZ': 'https://www.islamicfinder.org/prayer-widget/934985/shafi/1/0/18.0/17.0',
     'TC': 'https://www.islamicfinder.org/prayer-widget/47702487/shafi/1/0/18.0/17.0',
     'TD': 'https://www.islamicfinder.org/prayer-widget/2427123/shafi/1/0/18.0/17.0',
     'TF': 'nil',
     'TG': 'https://www.islamicfinder.org/prayer-widget/47493059/shafi/1/0/18.0/17.0',
     'TH': 'https://www.islamicfinder.org/prayer-widget/1609350/shafi/1/0/18.0/17.0',
     'TJ': 'https://www.islamicfinder.org/prayer-widget/1221874/shafi/1/0/18.0/17.0',
     'TK': 'https://www.islamicfinder.org/prayer-widget/7522181/shafi/1/0/18.0/17.0',
     'TL': 'https://www.islamicfinder.org/prayer-widget/1645457/shafi/1/0/18.0/17.0',
     'TM': 'https://www.islamicfinder.org/prayer-widget/162183/shafi/1/0/18.0/17.0',
     'TN': 'https://www.islamicfinder.org/prayer-widget/2464470/shafi/12/0/18.0/18.0',
     'TO': 'https://www.islamicfinder.org/prayer-widget/4032402/shafi/1/0/18.0/17.0',
     'TR': 'https://www.islamicfinder.org/prayer-widget/323786/shafi/16/0/18.0/17.0',
     'TT': 'https://www.islamicfinder.org/prayer-widget/3573890/shafi/1/0/18.0/17.0',
     'TV': 'https://www.islamicfinder.org/prayer-widget/2110394/shafi/1/0/18.0/17.0',
     'TW': 'https://www.islamicfinder.org/prayer-widget/1668341/shafi/1/0/18.0/17.0',
     'TZ': 'https://www.islamicfinder.org/prayer-widget/160196/shafi/1/0/18.0/17.0',
     'UA': 'https://www.islamicfinder.org/prayer-widget/703448/shafi/1/0/18.0/17.0',
     'UG': 'https://www.islamicfinder.org/prayer-widget/232422/shafi/1/0/18.0/17.0',
     'UM-DQ': 'https://www.islamicfinder.org/prayer-widget/4140963/shafi/5/0/15.0/15.0',
     'UM-FQ': 'https://www.islamicfinder.org/prayer-widget/4140963/shafi/5/0/15.0/15.0',
     'UM-HQ': 'https://www.islamicfinder.org/prayer-widget/4140963/shafi/5/0/15.0/15.0',
     'UM-JQ': 'https://www.islamicfinder.org/prayer-widget/4140963/shafi/5/0/15.0/15.0',
     'UM-MQ': 'https://www.islamicfinder.org/prayer-widget/4140963/shafi/5/0/15.0/15.0',
     'UM-WQ': 'https://www.islamicfinder.org/prayer-widget/4140963/shafi/5/0/15.0/15.0',
     'US': 'https://www.islamicfinder.org/prayer-widget/4140963/shafi/5/0/15.0/15.0',
     'UY': 'https://www.islamicfinder.org/prayer-widget/3441575/shafi/1/0/18.0/17.0',
     'UZ': 'https://www.islamicfinder.org/prayer-widget/1512569/shafi/1/0/18.0/17.0',
     'VA': 'https://www.islamicfinder.org/prayer-widget/3164670/shafi/1/0/18.0/17.0',
     'VC': 'https://www.islamicfinder.org/prayer-widget/3577887/shafi/1/0/18.0/17.0',
     'VE': 'https://www.islamicfinder.org/prayer-widget/3646738/shafi/1/0/18.0/17.0',
     'VG': 'https://www.islamicfinder.org/prayer-widget/3577430/shafi/1/0/18.0/17.0',
     'VI': 'https://www.islamicfinder.org/prayer-widget/4795467/shafi/1/0/18.0/17.0',
     'VN': 'https://www.islamicfinder.org/prayer-widget/1581130/shafi/1/0/18.0/17.0',
     'VU': 'https://www.islamicfinder.org/prayer-widget/2135171/shafi/1/0/18.0/17.0',
     'WF': 'nil',
     'WS': 'https://www.islamicfinder.org/prayer-widget/4035413/shafi/1/0/18.0/17.0',
     'YE': 'https://www.islamicfinder.org/prayer-widget/71137/shafi/4/0/18.5/19.0',
     'YT': 'https://www.islamicfinder.org/prayer-widget/921815/shafi/1/0/18.0/17.0',
     'ZA': 'https://www.islamicfinder.org/prayer-widget/3369157/shafi/1/0/18.0/17.0',
     'ZM': 'https://www.islamicfinder.org/prayer-widget/909137/shafi/1/0/18.0/17.0',
     'ZW': 'https://www.islamicfinder.org/prayer-widget/890299/shafi/1/0/18.0/17.0'
   }

   storage_set(countriesUrlsStorageKey, countriesUrls);
   return countriesUrls;
 }

 async function scrapeHigriDateAndTimes(countryCode) {
   let url = getHigriUrl(countryCode);

   if (url) {
     fetch(url)
       .then(function(response) {
         return response.text();
       })
       .then(function(html) {
         let parser = new DOMParser();
         let doc = parser.parseFromString(html, "text/html");
         let higriObj = new Higri();
         higriObj.countryCode = countryCode;
         higriObj.lastModify = new Date().toDateString();

         let country = doc.querySelector('.inline-link').innerHTML;
         higriObj.country = country;

         let higriDate = doc.querySelector('#grey div').innerHTML;
         higriObj.higriDate = higriDate;

         let fajrTime = doc.querySelector("#calendar > div > div.pad-left-sm.pad-right-sm.d-flex.flex-direction-col.text-center > div:nth-child(1) > p:nth-child(3)").innerHTML;
         higriObj.fajrTime = fajrTime;

         let sunriseTime = doc.querySelector("#calendar > div > div.pad-left-sm.pad-right-sm.d-flex.flex-direction-col.text-center > div:nth-child(3) > p:nth-child(3)").innerHTML;
         higriObj.sunriseTime = sunriseTime;

         let duhrTime = doc.querySelector("#calendar > div > div.pad-left-sm.pad-right-sm.d-flex.flex-direction-col.text-center > div:nth-child(5) > p:nth-child(3)").innerHTML;
         higriObj.duhrTime = duhrTime;

         let asrTime = doc.querySelector("#calendar > div > div.pad-left-sm.pad-right-sm.d-flex.flex-direction-col.text-center > div:nth-child(7) > p:nth-child(3)").innerHTML;
         higriObj.asrTime = asrTime;

         let magiribTime = doc.querySelector("#calendar > div > div.pad-left-sm.pad-right-sm.d-flex.flex-direction-col.text-center > div:nth-child(9) > p:nth-child(3)").innerHTML;
         higriObj.magiribTime = magiribTime;
         let ishaTime = doc.querySelector("#calendar > div > div.pad-left-sm.pad-right-sm.d-flex.flex-direction-col.text-center > div:nth-child(11) > p:nth-child(3)").innerHTML;
         higriObj.ishaTime = ishaTime;

         // let hijrDay = hijri_date.replace(/(^\d+)(.+$)/i, "$1");
         // let hijrMonth = hijri_date.split(' ')[1].replace(/,/g, '');
         // let hijrYear = hijri_date.split(' ')[2].replace(/h/g, '');

         storage_set(Higri.storageKey, higriObj);
         return higriObj;
       });
   } else {
     console.log('Cannot find higri url');
   }
 }

 function getHigriUrl(countryCode) {
   let countriesUrls = storage_get(countriesUrlsStorageKey);
   if (!countriesUrls) {
     countriesUrls = makecountriesUrls();
   }
   let map = new Map(Object.entries(countriesUrls));
   let url = map.get(countryCode);
   if (url) {
     return url;
   }
   return null;
 }