let stockCountProductPattern =/(?<productCode>\d{1,8})\t(?<productName>[-\w\s\/\(\)+&.]{6,45})\t(\s|\d{2,6})\t\s(?<box>[\d,.]{4,6})\s(?<inner>[\d,.]{4,10})\s(?<each>[\d,.]{4,10})\s\t\t(?<total>[\d,.]{4,10})\t/g;




let report = `
	
powered by MacromatiX	Georgi Urumov - 129768
Session: 30 mins remaining

KFC UK Web Site		
Log Off
StoresStore Admin
Inventory Count

Store:	
FARNBOROUGH - VICTORIA RD - 11037
select

New Count
Count In Progress
Confirm Count
Reports
Count in Progress
Select Required Count
Status	
All
Prev 14 Days
PDF
Count Title	
Weekly Count - Sun - 18-Jun-2023 17:04:12

Weekly
Batch Number#	
11133321
   
Applied
   	
Authorised By: Georgi Urumov. Applied at: 18-Jun-2023 05:04 PM
 Select Group to Count
Stock Take Group	
All
Show ONLY items still to be counted

   
  
Main
Item	 	 	Box...	Inner..	Unit.	
Apply
Applied	Total	 
11241	BEANS LARGE PREPOTTED	 	
0.00
0.00
51.00
		51.00	
11240	BEANS REGULAR PREPOTTED	 	
1.00
0.00
0.00
		64.00	
1046	CHEESE SLICE	 	
0.00
5.00
0.00
		840.00	
10510	CHICKEN ORIGINAL (DARK MEAT)	 	
0.00
0.00
0.00
		0.00	
1	CHICKEN ORIGINAL (Pieces)	 	
0.00
0.00
0.00
		0.00	
138	COLESLAW LARGE	 	
1.00
0.00
12.00
		48.00	
137	COLESLAW REGULAR	 	
0.00
0.00
47.00
		47.00	
10425	LETTUCE APOLLO MIX	 	
0.00
2.00
0.00
		0.50	
1679	MILK FRESH	1679	
0.00
0.00
0.00
		0.00	
76170	MILK FRESH	1679	
0.00
7.00
0.00
		14.00	
734	PEPPER MAYO	 	
0.00
12.00
0.00
		9.00	
10422	PICKLED SLAW	 	
0.00
1.00
0.00
		1.00	
1002	SALAD ICEBERG	 	
0.00
7.00
0.00
		3.50	
1025	SAUCE BURGER DRESSING	 	
0.00
19.00
0.00
		14.63	
733	TOMATO CHOPPED	 	
0.00
6.00
0.00
		2.40	
10237	WHITE CHOCOLATE PIECES (Milky Bar)	 	
0.00
7.00
0.00
		2.80	
10332	AERO CHOC PIECES	 	
0.00
2.44
0.00
		1.22	
10420	BEAN SALSA	 	
1.00
0.99
0.00
		8.23	
1380	BREADING HOT&CRISPY	 	
1.00
3.08
0.00
		12.50	
13	BREADING SALT	 	
1.00
0.00
0.00
		15.29	
10432	CHOCOLATE POWDER SBC	 	
0.00
8.00
0.00
		8.00	
75803	COFFEE BEAN (KB)	10441	
0.00
0.00
0.00
		0.00	
10441	COFFEE BEAN (KENTUCKY BLEND)	10441	
0.00
0.00
8.46
		8.46	
11114	DIP GARLIC MAYO	 	
0.95
0.00
0.00
		190.00	
11111	DIP SMOKY BBQ	 	
0.60
0.00
0.00
		120.00	
11197	DIP SUPERCHARGER	 	
1.50
0.00
0.00
		300.00	
11112	DIP SWEET CHILLI	 	
0.96
0.00
0.00
		192.00	
11109	DIP TOMATO SAUCE	 	
0.45
0.00
0.00
		90.00	
10	FLOUR 3 STEP	 	
10.00
0.00
0.00
		113.40	
11037	GRAVY 3 STEP	 	
1.45
0.00
0.00
		72.50	
11146	GRAVY BOOSTER	 	
0.00
0.00
0.00
		0.00	
183	ICE CREAM MIX	 	
1.00
6.61
0.00
		18.61	
14	MILK & EGG MIX	 	
0.00
23.00
0.00
		7.82	
10238	MILK CARNATION CONDENSED	 	
0.00
11.50
0.00
		5.18	
718	MILK MILLAC MAID	 	
0.00
0.00
0.00
		0.00	
10043	SACHET BBQ SAUCE	 	
1.40
0.00
0.00
		2100.00	
10169	SACHET LIGHT MAYONNAISE	10169	
1.00
0.00
0.00
		1100.00	
76151	SACHET LIGHT MAYONNAISE CONTINGENCY	10169	
0.00
0.00
0.00
		0.00	
1680	SACHET TOMATO KETCHUP	 	
0.15
0.00
0.00
		225.00	
931	SALT SACHETS	 	
1.50
0.00
0.00
		7500.00	
11192	SAUCE BBQ SMOKEY(Twister)	 	
0.00
3.40
0.00
		3.23	
11257	SAUCE BUFFALO (TWISTER)	 	
0.00
2.00
0.00
		2.00	
11183	SAUCE BUTTERMILK DRESSING	 	
0.00
0.50
0.00
		0.53	
10306	SAUCE CHOCOLATE (KRUSHEMS + SUNDAE)	 	
1.00
11.00
0.00
		17.00	
805	SAUCE DADDIES (Ketchup)	 	
0.00
5.72
0.00
		7.72	
773	SAUCE HOT SALSA SMOOTH	 	
0.00
2.60
0.00
		2.79	
11148	SAUCE KANSAS BBQ (BITES)	11148	
0.00
0.00
0.00
		0.00	
75997	SAUCE KANSAS BBQ (BITES)	11148	
1.00
3.00
0.00
		10.85	
11256	SAUCE KOREAN BBQ	 	
0.00
3.00
0.00
		3.00	
10233	SAUCE SUPERCHARGER	 	
0.00
2.00
0.35
		2.35	
10406	SAUCE SWEET CHILLI (BITES)	 	
0.00
10.00
0.00
		11.70	
11056	SAUCE SWEET CHILLI (Stacker)	11056	
0.00
0.00
4.00
		4.00	
75811	SAUCE SWEET CHILLI (Stacker)	11056	
0.00
0.00
0.00
		0.00	
11222	SAUCE VEGAN MAYO	 	
0.00
3.48
0.00
		3.41	
11	SEASONING 3 STEP	 	
1.00
1.00
0.00
		11.84	
1570	SUGAR STICKS	 	
0.70
0.00
0.00
		3500.00	
11120	SWEETCORN	 	
0.00
1.00
0.00
		0.34	
10431	TEA BAGS	 	
0.00
6.00
0.00
		600.00	
1670	TOPPING OREO PCS	 	
2.00
3.00
0.00
		10.80	
729	BAG BROWN PAPER	 	
1.50
0.00
0.00
		1500.00	
10318	BAG CARRIER LARGE	 	
2.50
0.00
0.00
		625.00	
1572	BAG CHICKEN LARGE	 	
0.93
0.00
0.00
		1674.00	
11248	BAG CHICKEN SMALL (H/W)	 	
0.00
0.00
0.00
		0.00	
1571	BAG CHICKEN SMALL (OR)	 	
2.30
0.00
0.00
		4600.00	
88	BAG CORN COBETTE	 	
1.00
8.00
61.00
		3861.00	
109	BAG FILLET PLASTIC	 	
0.00
1.00
600.00
		1600.00	
98	BAG FRIES (GENERIC) 8 x 8	 	
1.50
0.00
0.00
		6000.00	
11177	BAG FRIES REG (11x11 FRIES)	 	
0.70
0.00
0.00
		3500.00	
10382	BOX 6 IN 1	 	
1.30
0.00
0.00
		390.00	
1633	BOX BUCKET SNACKBOX	1633	
0.00
0.00
0.00
		0.00	
11113	BOX DIPS BAR	 	
1.00
0.00
0.00
		250.00	
10034	BOX MEGABOX (4 IN 1)	 	
0.92
0.00
0.00
		322.00	
876	BOX POPCORN LARGE	 	
1.00
5.00
0.00
		625.00	
877	BOX POPCORN REG	 	
0.00
5.00
4.00
		129.00	
1123	BOX POPCORN SMALL	 	
1.20
0.00
0.00
		1800.00	
10536	BOX RICEBOX (2017)	 	
0.28
0.00
0.00
		56.00	
74	BUCKET & LID 130oz	 	
0.00
0.00
130.00
		130.00	
10372	BUCKET & LID 85OZ	 	
0.00
0.00
500.00
		500.00	
10396	BUCKET & LID MIGHTY (54oz)	 	
1.01
0.00
0.00
		254.52	
11233	BUCKET KIDS	 	
0.92
0.00
0.00
		165.60	
11218	BUCKET POPCORN 35oz	 	
0.00
0.00
0.00
		0.00	
76004	BUCKET SNACKBOX	1633	
0.52
0.00
0.00
		228.80	
75879	CARRIER 2 CUP	89	
1.85
0.00
0.00
		1073.00	
89	CARRIER 2 CUP	89	
0.00
0.00
0.00
		0.00	
1167	CARRIER 4 CUP	 	
0.00
0.00
340.00
		340.00	
1487	CLAMSHELL BANQUET	 	
0.65
0.00
0.00
		325.00	
1632	CLAMSHELL CLASSIC (WRAP BURGER)	 	
0.00
0.00
1,200.00
		1200.00	
11171	CLAMSHELL FRIES (Delivery Only)	 	
0.45
0.00
0.00
		432.00	
11251	CLAMSHELL MINI FILLET BURGER	 	
0.10
0.00
0.00
		40.00	
11055	CLAMSHELL STACKER & TOWER	 	
0.00
0.00
250.00
		250.00	
11223	CLAMSHELL VEGAN	 	
0.00
0.00
230.00
		230.00	
108	CORN SKEWERS	108	
0.62
0.00
0.00
		1240.00	
75759	CORN SKEWERS (2000)	108	
0.00
0.00
0.00
		0.00	
10424	CUP 12oz TALL SBC + KB	 	
0.00
7.00
0.00
		175.00	
85	CUP 16OZ	 	
0.00
27.00
0.00
		1350.00	
87	CUP 22OZ	 	
0.00
3.00
48.00
		198.00	
11205	CUP CLEAR - SOUTHERN REFRESHER	 	
0.00
0.00
0.00
		0.00	
1674	CUP KRUSHEMS	 	
0.00
5.50
0.00
		110.00	
11124	FORK PLASTIC LONG 18cm	 	
0.00
0.00
0.00
		0.00	
86	LID 12/16/22OZ	 	
0.00
20.00
0.00
		2000.00	
11201	LID CARD (Rice / Salad/ Bites)	 	
0.00
22.00
0.00
		1100.00	
1586	LID HOT CUP (LID KFC EMBOSSED )	 	
1.00
5.00
0.00
		1625.00	
1612	LID KRUSHEM	 	
0.00
0.00
0.00
		0.00	
1133	LID SIDE LARGE	 	
1.25
0.00
0.00
		1440.00	
1142	LID SIDE SMALL	 	
1.30
0.00
0.00
		3120.00	
11237	LID SIPPY	 	
1.95
0.00
0.00
		4118.40	
101	NAPKINS	101	
0.00
0.00
0.00
		0.00	
75980	NAPKINS (8000)	101	
0.00
12.00
0.00
		12000.00	
200	PLATE - BOAT TRAY	 	
0.00
0.00
0.00
		0.00	
11200	POT SIDE CARD (Rice / Salad / Bites)	 	
0.00
20.50
0.00
		1025.00	
1129	POT SIDE LARGE	 	
1.00
3.00
36.00
		1462.00	
1141	POT SIDE SMALL	 	
0.65
0.00
0.00
		1560.00	
11170	SCOOP FRIES LARGE (11X11 Fries)	 	
0.36
0.00
0.00
		468.00	
834	SPOON DESERT	 	
2.00
0.00
300.00
		2300.00	
104	SPORKS	 	
0.00
0.00
0.00
		0.00	
1435	STIRRERS WOODEN	 	
0.00
2.00
0.00
		1000.00	
1593	STRAWS JUMBO KRUSHEM	1593	
0.00
13.00
0.00
		2600.00	
76168	STRAWS JUMBO KRUSHEM	1593	
0.00
0.00
0.00
		0.00	
103	STRAWS WRAPPED	 	
0.00
13.00
0.00
		3250.00	
1324	TRAYLINER DBL SIDED	 	
2.00
0.00
0.00
		3200.00	
966	WETNAPS	 	
0.10
0.00
0.00
		600.00	
132	WOODEN FORKS	 	
1.00
0.00
5.00
		1005.00	
11252	WRAP KIDS	 	
1.00
0.00
0.00
		1000.00	
1656	WRAP STREETWISE (Mini Sleeve)	1656	
1.68
0.00
0.00
		1008.00	
76043	WRAP STREETWISE (Mini Sleeve)	1656	
0.00
0.00
0.00
		0.00	
1400	WRAP TWISTER(4 FLAVOUR)	 	
0.10
0.00
0.00
		50.00	
1024	BUN GLAZED (Water Split)	 	
0.00
14.00
0.00
		168.00	
1132	BUN MINI FILLET	 	
0.00
9.00
0.00
		108.00	
2	CHICKEN FILLETS	 	
0.00
0.00
0.00
		0.00	
714	CHICKEN FROZEN - (Heads)	 	
0.00
0.00
0.00
		0.00	
1406	CHICKEN HOTWINGS ISP	 	
0.00
0.00
0.00
		0.00	
1130	CHICKEN MINI FILLET	 	
0.00
0.00
0.00
		0.00	
11215	CHICKEN OR FILLET BITES FTF	 	
0.00
0.00
0.00
		0.00	
825	CHICKEN POPCORN	 	
0.00
0.00
0.00
		0.00	
1020	CHICKEN ZINGER ISP	 	
0.00
0.00
0.00
		0.00	
75884	COOKIE FULLY BAKED (FROZEN)	 	
1.00
0.00
0.00
		115.00	
10461	COOKIE WHITE CHOC	 	
0.84
0.00
0.00
		96.60	
66	CORN COBETTES	 	
1.50
0.00
0.00
		144.00	
11140	FRIES 11X11	 	
0.00
0.00
0.00
		0.00	
127	HASH BROWN	 	
1.00
0.00
0.00
		250.00	
11097	MASHED POTATOES	11097	
1.00
2.50
0.00
		1287.00	
76152	MASHED POTATOES	11097	
0.00
0.00
0.00
		0.00	
11227	PINEAPPLE STICK	 	
0.50
0.00
12.00
		62.00	
10513	RICE SPICEY	 	
0.00
2.00
0.00
		8.00	
1657	TORTILLA 20cm PLAIN	 	
0.00
11.00
0.00
		198.00	
11191	TORTILLA 25.4cm (4 Flavour Twister)	 	
0.00
11.00
0.00
		176.00	
11196	VEGAN FILLET	 	
0.00
9.00
2.00
		92.00	
76172	DELIVERY LABELS(World Cup)	107	
0.00
0.00
0.00
		0.00	
11225	FACE MASK	 	
2.00
0.00
0.00
		100.00	
10268	GLOVES	10268	
0.00
11.00
0.00
		1100.00	
10006	HAND SOAP	 	
6.00
0.00
0.00
		60.00	
11245	SPRINT FLOWER	 	
2.00
0.00
0.00
		3.00	
107	STICKERS (Delivery Labels)	107	
0.00
6.00
0.00
		2628.00	
75955	VINYL GLOVE L	10268	
0.00
0.00
0.00
		0.00	
75954	VINYL GLOVE M	10268	
0.00
0.00
0.00
		0.00	
10223	OIL PREMIUM PRESSURE FRYER	 	
0.00
11.00
0.00
		110.00	
34	BIB 7UP FREE	 	
1.90
0.00
0.00
		22.80	
32	BIB DIET PEPSI 12LT	 	
0.50
0.00
0.00
		6.00	
10571	BIB ICE TEA PEACH (LIPTON)	 	
1.10
0.00
0.00
		11.00	
11119	BIB PEPSI CHERRY MAX	 	
2.07
0.00
0.00
		24.84	
120	BIB PEPSI MAX	 	
2.40
0.00
0.00
		28.80	
11096	BIB ROBINSONS AP & BLKCURRANT	 	
1.40
0.00
0.00
		9.80	
33	BIB TANGO 12LT	 	
1.30
0.00
0.00
		15.60	
11199	BIB WATERMELON LIME	 	
1.84
0.00
0.00
		18.40	
1689	BTL 7UP FREE 1.5L	 	
0.00
0.00
7.00
		7.00	
43	BTL DIET PEPSI 1.5L	43	
0.00
0.00
17.00
		17.00	
71419	BTL DIET PEPSI 2L	43	
0.00
0.00
0.00
		0.00	
45	BTL PEPSI MAX 1.5L	45	
1.00
0.00
19.00
		31.00	
71422	BTL PEPSI MAX 2L	45	
0.00
0.00
0.00
		0.00	
46	BTL TANGO 1.5L	 	
1.00
0.00
5.00
		17.00	
11153	CAN 7UP FREE	 	
2.00
0.00
0.00
		48.00	
11059	CAN PEPSI MAX	 	
6.00
0.00
0.00
		144.00	
11060	CAN TANGO	 	
4.25
0.00
0.00
		102.00	
935	FRUIT SHOOT BLCKCURRANT/APPLE	 	
1.00
0.00
0.00
		24.00	
934	FRUIT SHOOT ORANGE	 	
2.00
0.00
0.00
		48.00	
1128	TROPICANA ORANGE	 	
0.91
0.00
0.00
		43.68	
11004	WATER SPARKLING	 	
1.00
0.00
13.00
		37.00	
37	WATER STILL 500ML	 	
1.00
0.00
0.00
		24.00	
   



Cash Management
 
Inventory
Stock Count
Waste Record
Orders
Transfers
MP&C
Forecasting
Mobile Forecasting
Recipe Viewer
 
Mobile Forecasting
 
Labour
 
Labour with T&A
 
HotSchedules
 
Reports
 
Menu
Work Flow
`

let stockCountMatch;
let stockCountProducts = {};
while ((stockCountMatch = stockCountProductPattern.exec(report))!== null) {
    let total = stringToNumber(stockCountMatch.groups.total);
    if (total > 0) {
        stockCountProducts[stockCountMatch.groups.productName] = total;
    }
}

console.log(stockCountProducts);

function stringToNumber(string) {
    if (!isNaN(string)) {
        return Number(string.trim().split(",").join("").split("£").join(""));
    }
}