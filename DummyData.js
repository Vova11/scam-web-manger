const connectDB = require('./src/db/mongoose')
const fixUrlPreLoad = require('./src/middleware/fixUrlPreLoad')
const Website = require('./src/models/website')
const User = require('./src/models/user')
const {writeFileSync} = require('fs');
const fs = require('fs')

// const scams = [
//   { title: 'buyandorder', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy/' 
// },
// { title: 'altrarunnerscz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy/' 
// },
// { title: 'sananga', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy/' 
// },
// { title: 'eccobotycz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy/' 
// },
// { title: 'dcshoescz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy/' 
// },
// { title: 'bluperlacesko', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy/' 
// },
// { title: 'grumxy', 
//  description: 'Stránky se prezentují jako oficiální lékařský portál, avšak nejde o žádný oficiální portál skutečných lékařů (https://www.coi.cz/grumxy/). Na stránkách je pak nabízen pochybný výrobek, který má navrátit sluch za 28 dní. Fotka uvedená na stránkách, kde je zveřejněn údajný odborník, který údajně obdržel Nobelovu cenu, je stažena z fotobanky a jméno je smyšlené. Fotka údajně spokojených zákazníků je také stažena z fotobanky. Česká obchodní inspekce tyto stránky považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy/' 
// },
// { title: 'dcshoescz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy/' 
// },
// { title: 'altracz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy/' 
// },
// { title: 'salomomcz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy/' 
// },
// { title: 'batteryplus', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy/' 
// },
// { title: 'caterpillarcz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy/' 
// },
// { title: 'polstarnakrk-cz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy/' 
// },
// { title: 'sunsea', 
//  description: '', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.soi.sk/sk/informacie-pre-verejnost/upozornenie-na-internetovu-galeriu-www-sunsea-sk.soi?ind=' 
// },
// { title: 'alabo', 
//  description: '', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.soi.sk/files/rizikov%C3%A9%20eshopy.pdf' 
// },
// { title: 'mobiluj', 
//  description: '', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.soi.sk/files/rizikov%C3%A9%20eshopy.pdf' 
// },
// { title: 'eleganceshop', 
//  description: '', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.soi.sk/sk/informacie-pre-verejnost/upozornenie-pre-spotrebitelov-internetovy-obchod-www-eleganceshop-sk.soi?ind=' 
// },
// { title: 'autoelektrony', 
//  description: '', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.soi.sk/files/rizikov%C3%A9%20eshopy.pdf' 
// },
// { title: 'viagogo', 
//  description: '', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.soi.sk/files/rizikov%C3%A9%20eshopy.pdf' 
// },
// { title: 'chyza', 
//  description: '', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.soi.sk/files/rizikov%C3%A9%20eshopy.pdf' 
// },
// { title: 'rajpradla', 
//  description: '', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.soi.sk/files/rizikov%C3%A9%20eshopy.pdf' 
// },
// { title: 'zasielkonos', 
//  description: '', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.soi.sk/sk/informacie-pre-verejnost/upozornenie-pre-spotrebitelov-zasielkovy-obchod-www-zasielkonos-sk.soi' 
// },
// { title: 'liberec2013', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'honzovyslevy', 
//  description: 'Nákupní galere (zprostředkování ze zahraničí): Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „nákupní galerii“, jejímž prostřednictvím údajně zboží nabízejí externí zahraniční subjekty. Má se jednat zřejmě o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem ihned k odeslání“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'obchodnicek', 
//  description: 'Nákupní galere (zprostředkování ze zahraničí): Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „nákupní galerii“, jejímž prostřednictvím údajně zboží nabízejí externí zahraniční subjekty. Má se jednat zřejmě o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem ihned k odeslání“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'maxivyprodeje', 
//  description: 'Česká obchodní inspekce registruje vysoký počet stížností, které se provozovatele internetových stránek týkají. Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „virtuální galerii“, jejímž prostřednictvím údajně zboží nabízejí externí subjekty. Obvykle se má jednat o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem u dodavatele“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'maldero', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lesni-valecek.myshopify', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'nejlepsinakup', 
//  description: 'Česká obchodní inspekce registruje vysoký počet stížností, které se provozovatele internetových stránek týkají. Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „virtuální galerii“, jejímž prostřednictvím údajně zboží nabízejí externí subjekty. Obvykle se má jednat o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem u dodavatele“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cistyodtok-cz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'obchodicek', 
//  description: 'Česká obchodní inspekce registruje vysoký počet stížností, které se provozovatele internetových stránek týkají. Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „virtuální galerii“, jejímž prostřednictvím údajně zboží nabízejí externí subjekty. Obvykle se má jednat o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem u dodavatele“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'butikperla', 
//  description: 'Česká obchodní inspekce obdržela několik podání spotřebitelů na tento web, jehož prostřednictvím je spotřebitelům nabízeno dámské a pánské oblečení a obuv. Objednané zboží, za které spotřebitelé zaplatili, však nebylo dodáno. Na urgence, ani na následné odstoupení od smlouvy, nebylo reagováno. Náhledem na stránky bylo zjištěno, že jejich provozovatelem by měla být společnost TIME Móda s.r.o., IČO 07376863, sídlem 396 01 Vystrkov 59. Zdejší inspektorát ČOI u jmenované společnosti zahájil kontrolu, kdy od jednatelky společnosti obdržel vyjádření, že společnost TIME Móda s.r.o. není provozovatelem e-shopu na výše uvedených webových stránkách. Společnost objednávky zboží, ani peněžní prostředky, nikdy neobdržela. O existenci e-shopu se společnost dozvěděla dne 16. 12. 2021 a bezprostředně poté podala trestní oznámení na neznámého pachatele.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'levneoutdoor', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'newherbalremedy', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zdraveprsty-na-nohou-cz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pulsnioxymetrcz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'botybogs', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: '1460pascal', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'caterpillar-schoenen', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'czobuveshop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'icebugobuv', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kamagra-1stcz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'uyjiy', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'jimisia', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kodykuponu', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kvhc', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'botykeensleva', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'damecbd', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'salomon-praha', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'solnadymka-cz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.cannapt', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'promoshopmedia', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lunzo', 
//  description: 'Česká obchodní inspekce registruje vysoký počet stížností, které se provozovatele internetových stránek týkají. Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „virtuální galerii“, jejímž prostřednictvím údajně zboží nabízejí externí subjekty. Obvykle se má jednat o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem u dodavatele“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'ceskarna', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vibramboty', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'botyscarpa', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'columbiacz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'abshuzhi', 
//  description: 'Stránka se otevře správně jen těm, kteří přijdou z reklamy na Facebooku (https://www.coi.cz/shduolian-fb/) a následně se zobrazí lživý obsah o tom, že Ivo Lukačovič investuje 100 milionů Kč do zahraniční firmy (https://www.coi.cz/abshuzhi/). Tato zpráva se nezakládá na pravdě. Na stránce jsou pak údaje o tom, komu a kam poslat peníze, respektive částku v kryptoměně Bitcoin, aby člověk také rychle zbohatl. Uvedená stránka navíc zneužívá loga českých televizních společností, aby vypadala důvěryhodněji. Česká obchodní inspekce před těmito stránkami varuje, provozovatel je neznámý.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'jackwolfskinpraha', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'meek', 
//  description: 'Česká obchodní inspekce registruje vysoký počet stížností, které se provozovatele internetových stránek týkají. Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „virtuální galerii“, jejímž prostřednictvím údajně zboží nabízejí externí subjekty. Obvykle se má jednat o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem u dodavatele“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'joolando', 
//  description: 'Obchodní podmínky se nedají "rozkliknout". Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lapert', 
//  description: 'Česká obchodní inspekce registruje vysoký počet stížností, které se provozovatele internetových stránek týkají. Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „virtuální galerii“, jejímž prostřednictvím údajně zboží nabízejí externí subjekty. Obvykle se má jednat o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem u dodavatele“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. V souvislosti s krizovou situací ohledně onemocnění COVID-19 ČOI obdržela stížnosti týkající se přemrštěných cen osobních ochranných pomůcek a velmi dlouhých dodacích lhůt. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fashion-mode', 
//  description: 'Provozovatel neuvádí IČ, takže nelze ověřit provozovatele. Spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'coffeeboy', 
//  description: 'Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „nákupní galerii“, jejímž prostřednictvím údajně zboží nabízejí externí zahraniční subjekty. Má se jednat zřejmě o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem ihned k odeslání“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vanspraha', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'aiglevyprodej', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.indoorsuper', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zasilkonos', 
//  description: 'Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „nákupní galerii“, jejímž prostřednictvím údajně zboží nabízejí externí zahraniční subjekty. Má se jednat zřejmě o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem ihned k odeslání“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'drmartensbotysleva', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'sorelpraha', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pumaslovensko', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.discountoutlets2021', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lzztcbuj.bestremedyforpeople', 
//  description: 'Stránka, na kterou se dostane spotřebitel nejčastěji přes spam v e-mailu, nabízí nejčastěji neznámý výrobek na prodloužení mládí. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bgznyxlbkgp', 
//  description: 'Stránka láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Míří sem spotřebitelé nejen z reklamních lživých stránek, kde zázračné zbohatnutí má slibovat i premiér ČR Andrej Babiš (https://www.coi.cz/bgznyxlbkgp/), jde však o smyšlené údaje a rozhovor, který neexistoval. Stránka zneužívá kryptoměny k nalákání dalších na údajné investice a zázračné zbohatnutí a periodicky obměňuje příběh a mění domény. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'beliamo', 
//  description: 'Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „nákupní galerii“, jejímž prostřednictvím údajně zboží nabízejí externí zahraniční subjekty. Má se jednat zřejmě o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem ihned k odeslání“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'unequalweb', 
//  description: 'Stránka se otevře správně jen těm, kteří přijdou z reklamy na Facebooku (https://www.coi.cz/shduolian-fb/) a následně se zobrazí lživý obsah o tom, že Radovan Vítek investuje 100 milionů Kč do zahraniční firmy (https://www.coi.cz/unequalweb/). Tato zpráva se nezakládá na pravdě. Na stránce jsou pak údaje o tom, komu a kam poslat peníze, respektive částku v kryptoměně Bitcoin, aby člověk také rychle zbohatl. Uvedená stránka navíc zneužívá loga českých televizních společností, design webu Hospodářských novin, aby vypadala důvěryhodněji. Žádný takový článek Hospodářské noviny skutečně nenapsaly. Česká obchodní inspekce před těmito stránkami varuje, provozovatel je neznámý.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'prttye1wk', 
//  description: 'Stránka láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Míří sem spotřebitelé nejen z reklamních lživých stránek, kde zázračné zbohatnutí má slibovat i premiér ČR Andrej Babiš (https://www.coi.cz/prttye1wk/), jde však o smyšlené údaje a rozhovor, který neexistoval. Stránka zneužívá kryptoměny k nalákání dalších na údajné investice a zázračné zbohatnutí a periodicky obměňuje příběh a mění domény. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'rwblvtfc', 
//  description: 'Stránka se otevře správně jen těm, kteří přijdou z reklamy na Facebooku (https://www.coi.cz/shduolian-fb/) a následně se zobrazí lživý obsah o tom, že Ivo Lukačovič investuje 100 milionů Kč do zahraniční firmy (https://www.coi.cz/rwblvtfc/). Tato zpráva se nezakládá na pravdě. Na stránce jsou pak údaje o tom, komu a kam poslat peníze, respektive částku v kryptoměně Bitcoin, aby člověk také rychle zbohatl. Uvedená stránka navíc zneužívá loga českých televizních společností, aby vypadala důvěryhodněji. Česká obchodní inspekce před těmito stránkami varuje, provozovatel je neznámý.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'satansdesign', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lifeproducti', 
//  description: 'Stránka, na kterou se dostane spotřebitel nejčastěji přes spam v e-mailu, nabízí nejčastěji neznámý výrobek na hubnutí. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bedernioperkacz', 
//  description: 'Stránka, na kterou se dostane spotřebitel nejčastěji přes spam v e-mailu, nabízí údajně výrobek na bolavá záda. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'saleegoods', 
//  description: 'Stránka, na kterou se dostane spotřebitel nejčastěji přes spam v e-mailu, nabízí údajně drony. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'suggesthome', 
//  description: 'Stránka se otevře správně jen těm, kteří přijdou z reklamy na Facebooku (https://www.coi.cz/shduolian-fb/) a následně se zobrazí lživý obsah o tom, že Radovan Vítek investuje 100 milionů Kč do zahraniční firmy (https://www.coi.cz/suggesthome/). Tato zpráva se nezakládá na pravdě. Na stránce jsou pak údaje o tom, komu a kam poslat peníze, respektive částku v kryptoměně Bitcoin, aby člověk také rychle zbohatl. Uvedená stránka navíc zneužívá loga českých televizních společností, design webu Hospodářských novin, aby vypadala důvěryhodněji. Žádný takový článek Hospodářské noviny skutečně nenapsaly. Česká obchodní inspekce před těmito stránkami varuje, provozovatel je neznámý.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mluvicikrecek-cz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'suprisimo', 
//  description: 'Česká obchodní inspekce registruje vysoký počet stížností, které se provozovatele internetových stránek týkají. Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „virtuální galerii“, jejímž prostřednictvím údajně zboží nabízejí externí subjekty. Obvykle se má jednat o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem u dodavatele“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bonky', 
//  description: 'Česká obchodní inspekce registruje vysoký počet stížností, které se provozovatele internetových stránek týkají. Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „virtuální galerii“, jejímž prostřednictvím údajně zboží nabízejí externí subjekty. Obvykle se má jednat o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem u dodavatele“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'booho', 
//  description: 'Česká obchodní inspekce registruje vysoký počet stížností, které se provozovatele internetových stránek týkají. Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „virtuální galerii“, jejímž prostřednictvím údajně zboží nabízejí externí subjekty. Obvykle se má jednat o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem u dodavatele“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'guilaiyoushe', 
//  description: 'Stránka se otevře správně jen těm, kteří přijdou z reklamy na Facebooku (https://www.coi.cz/shduolian-fb/) a následně se zobrazí lživý obsah o tom, že Ivo Lukačovič investuje 100 milionů Kč do zahraniční firmy (https://www.coi.cz/guilaiyoushe/). Tato zpráva se nezakládá na pravdě. Na stránce jsou pak údaje o tom, komu a kam poslat peníze, respektive částku v kryptoměně Bitcoin, aby člověk také rychle zbohatl. Uvedená stránka navíc zneužívá loga českých televizních společností, aby vypadala důvěryhodněji. Česká obchodní inspekce před těmito stránkami varuje, provozovatel je neznámý.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'darka-line', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mizuno-boty', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'keenczboty', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'poplatky-zpet', 
//  description: 'Web neobsahuje žádnou identifikaci provozovatele, stránky jsou zcela anonymní. Dále chybí transparentním způsobem poskytnutá informace, kdo je zde vlastně správce osobních údajů a to včetně kontaktních údajů na něj. Před vyplněním osobních údajů na těchto stránkách varuje Úřad pro ochranu osobních údajů a Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'thursdayboots', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'thenorthfacesvyprodej', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'solar-group', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cheap.clearance2021', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'megacashfortress', 
//  description: 'Web láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Stránka přepisuje rozhovor, který však neexistoval. Web zneužívá logo Novinky.cz a loga českých televizních stanic. Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové. Viz https://www.coi.cz/megacashfortress/', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'seethebestoptions', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vanefistneotabs', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'nikecz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'certifikatlevne', 
//  description: 'Internetové stránky neobsahují informace o provozovateli. Padělání certifikátů o očkování nebo testu na onemocnění COVID 19 je trestným činem padělání a pozměnění veřejné listiny. Trestné není jen samotné padělání certifikátu, ale i jeho držení a užití. Trestní postih tak hrozí nejen provozovateli webových stránek, ale i případným zákazníkům. Pokusy o zakoupení falešných certifikátů důrazně nedoporučujeme.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'rivio', 
//  description: 'Česká obchodní inspekce registruje vysoký počet stížností, které se provozovatele internetových stránek týkají. Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „virtuální galerii“, jejímž prostřednictvím údajně zboží nabízejí externí subjekty. Obvykle se má jednat o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem u dodavatele“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'booho', 
//  description: 'Česká obchodní inspekce registruje vysoký počet stížností, které se provozovatele internetových stránek týkají. Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „virtuální galerii“, jejímž prostřednictvím údajně zboží nabízejí externí subjekty. Obvykle se má jednat o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem u dodavatele“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'balando', 
//  description: 'Česká obchodní inspekce registruje vysoký počet stížností, které se provozovatele internetových stránek týkají. Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „virtuální galerii“, jejímž prostřednictvím údajně zboží nabízejí externí subjekty. Obvykle se má jednat o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem u dodavatele“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'salewaeshop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'shoeshopcz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: '123-barvy', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'veteranspridelandscaping', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: '123-123', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'riekerbotyshop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.lekarskereporteri24', 
//  description: 'Stránky se prezentují jako zpravodajský portál, který popisuje údajný zázračný trik na hubnutí. Na stránkách je pak nabízen neznámý výrobek na hubnutí. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lrvvzglc.bestwellbeings', 
//  description: 'Stránky nabízejí neznámý výrobek na klouby. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'querid', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'rammicr', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'aizhongzhou', 
//  description: 'Stránka se otevře správně jen těm, kteří přijdou z reklamy na Facebooku (https://www.coi.cz/dluskdj/) a následně se zobrazí lživý obsah o tom, že se dá zázračně rychle zbohatnout (https://www.coi.cz/aizhongzhou/). Tato zpráva se nezakládá na pravdě. Na stránce jsou pak lidé vyzváni vyplnit osobní údaje a odeslat neznámo komu. Uvedená stránka navíc zneužívá logo České televize, TV Nova i TV Prima. Česká obchodní inspekce před těmito stránkami varuje, provozovatel je neznámý.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'czfung', 
//  description: 'Stránka se otevře správně jen těm, kteří přijdou z reklamy a vypadá takto: https://www.coi.cz/czfung/ . Následně se zobrazí lživý obsah o tom, že můžete problém s plísněmi vyřešit za pomoci neznámého výrobku. Uvedená stránka navíc zneužívá loga českých televizních společností, aby vypadala důvěryhodněji. Česká obchodní inspekce před těmito stránkami varuje, provozovatel je neznámý.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'drbotyvyprodej', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'botygroundies', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'botyaku', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zahradnikem-nedopatrenim', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vivobarefootprimus', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kspaceproject', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'czh.tactical-xdrone.newsalepro', 
//  description: 'Stránka, na kterou se dostane spotřebitel nejčastěji přes spam v e-mailu, nabízí údajně drony. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'luckysaleonline', 
//  description: 'Stránka, na kterou se dostane spotřebitel nejčastěji přes spam v e-mailu, nabízí údajně výrobek pro lidi trpící cukrovkou. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'creeledcz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cpaggette3', 
//  description: 'Na základě smyšlených informací je tu prezentován neznámý přípravek na prostatu. Na stránkách jsou pak recenze údajně spokojených uživatelů, tyto recenze jsou však smyšlené - na jiných verzích stránek v jiném jazyce existují stejné fotografie u recenzí, avšak jiná jména (dle jazyka). Příběh je smyšlený, provozovatel je uveden na celé řadě dalších rizikových webů nabízející obdobné rychlé řešení problémů se zdravím. Nákup zde za rizikový považuje Česká obchodní inspekce, stránky jsou anonymní na blíže nespecifikovanou zahraniční firmu a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'naturaltovars', 
//  description: 'Stránka, na kterou se dostane spotřebitel nejčastěji přes spam v e-mailu, nabízí údajně drony. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.drdermr', 
//  description: 'Na základě smyšlených informací je tu prezentován neznámý přípravek na lupénku. Na stránkách jsou pak recenze údajně spokojených uživatelů, tyto recenze jsou však smyšlené - na jiných verzích stránek v jiném jazyce existují stejné fotografie u recenzí, avšak jiná jména (dle jazyka). Příběh je smyšlený, provozovatel je uveden na celé řadě dalších rizikových webů nabízející obdobné rychlé řešení problémů se zdravím. Nákup zde za rizikový považuje Česká obchodní inspekce, stránky jsou anonymní na blíže nespecifikovanou zahraniční firmu a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'martenspraha', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'botykeen', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bymamiii', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bagscnshop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mraky-kostek', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vivobarefootcz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'supraslovensko', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'ipermediaservizi', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zubni-kartacek', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kynkorova-psycholog', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kracen-nabytek', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'match-pro', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mdseshop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'wkmoto', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vejavyprodej', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'darekk80narozeninam', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'sefovepodlupou', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'web-development', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'eurosprintczech', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cpgtpotok5', 
//  description: 'Stránky se prezentují jako zpravodajský portál, který popisuje údajný zázračný trik na hubnutí. Na stránkách je pak nabízen neznámý výrobek na hubnutí. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'chytrynaramek-cz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lasportivacz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'marklv', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'adbotyeshop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'besttovarsale', 
//  description: 'Na základě smyšlených informací je tu prezentován neznámý přípravek na zhubnutí. Na stránkách jsou pak recenze údajně spokojených uživatelů, tyto recenze jsou však smyšlené - na jiných verzích stránek v jiném jazyce existují stejné fotografie u recenzí, avšak jiná jména (dle jazyka). Příběh je smyšlený, provozovatel je uveden na celé řadě dalších rizikových webů nabízející obdobné rychlé řešení problémů se zdravím. Nákup zde za rizikový považuje Česká obchodní inspekce, stránky jsou anonymní na blíže nespecifikovanou zahraniční firmu a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'geoxvyprodej', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'urbaner', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'drmartensvyprodej', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz1.alkotoxv', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý přípravek v boji proti alkoholu. Obchodní podmínky chybí. . Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajná firma z Panamy, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'janfrohlich', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'rezidencegoethe', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'martenssleva', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'flyerlifestyle', 
//  description: 'Stránka se otevře správně jen těm, kteří přijdou z reklamy na Facebooku (https://www.coi.cz/cez-fb/) a následně se zobrazí lživý obsah o tom, že díky energetickému gigantu ČEZ se dá zázračně rychle zbohatnout (https://www.coi.cz/flyerlifestyle/). Tato zpráva se nezakládá na pravdě. Na stránce jsou pak lidé vyzváni vyplnit osobní údaje a odeslat neznámo komu. Uvedená stránka navíc zneužívá logo skupiny ČEZ, která České obchodní inspekci potvrdila, že se jedná o zneužití jejich značky. Česká obchodní inspekce před těmito stránkami varuje, provozovatel je neznámý.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'adnxi.djflink', 
//  description: 'Stránka se otevře správně jen těm, kteří přijdou z reklamy na Facebooku (https://www.coi.cz/cez-fb/) a následně se zobrazí lživý obsah o tom, že díky energetickému gigantu ČEZ se dá zázračně rychle zbohatnout (https://www.coi.cz/djflink/). Tato zpráva se nezakládá na pravdě. Na stránce jsou pak lidé vyzváni vyplnit osobní údaje a odeslat neznámo komu. Uvedená stránka navíc zneužívá logo skupiny ČEZ, která České obchodní inspekci potvrdila, že se jedná o zneužití jejich značky. Česká obchodní inspekce před těmito stránkami varuje, provozovatel je neznámý.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'shduolian', 
//  description: 'Stránka se otevře správně jen těm, kteří přijdou z reklamy na Facebooku (https://www.coi.cz/shduolian-fb/) a následně se zobrazí lživý obsah o tom, že Ivo Lukačovič investuje 100 milionů Kč do zahraniční firmy (https://www.coi.cz/shduolian/). Tato zpráva se nezakládá na pravdě. Na stránce jsou pak údaje o tom, komu a kam poslat peníze, respektive částku v kryptoměně Bitcoin, aby člověk také rychle zbohatl. Uvedená stránka navíc zneužívá loga českých televizních společností, aby vypadala důvěryhodněji. Česká obchodní inspekce před těmito stránkami varuje, provozovatel je neznámý.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'sladkynapad', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vejaboty', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pepejeansvyprodej', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'ordoutdoor', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'slevyadidas', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'rehex', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'canadagoosevyprodej', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pumabotysleva', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'skechersczech', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'reactelements', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hugobosssleva', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'adlist', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.hemorv', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Na stránkách jsou též uvedeny informace, které se nezakládají na pravdě. Jako odborník je prezentován Jan Havlíček, doktor-proktolog s 20letou praxí, kandidát lékařských věd. Tento údajný lékař nemá žádný záznam na univerzitě, ani v jiné seriózní instituci. Fotka je stažena z fotobanky, jde o smyšleného odborníka. Před nákupem na těchto stránkách Česká obchodní inspekce varuje. Viz: https://www.coi.cz/hemorv/', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'homerest', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Na stránkách jsou též uvedeny informace, které se nezakládají na pravdě: "Neuvěřitelná zpráva! 13.09.2021 studentka z Česka obdržela cenu 5 milionů korun za vynikající výsledky v oblasti výzkumu proktologických patologií. Vydala krém na hemoroidy, který by mohl zachránit miliony životů!", viz obr.: https://www.coi.cz/homerest/ - uvedená zpráva je smyšlená. Na stránce pak je možnost objednat neznámý výrobek. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'campereshop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'theproductcool', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'american-supplements', 
//  description: 'Kontrolou Státní zemědělské a potravinářské inspekce bylo zjištěno a prokázáno, že na těchto internetových stránkách je nabízena k prodeji nebezpečná potravina. Jedná se konkrétně o potravinu SWISS PHARMACEUTICALS YOHIMBINE HCL dietary supplement 100 capsules, která je hodnocena jako nebezpečná dle článku 14 nařízení (ES) č. 178/2002, a tudíž nesmí být uváděna na trh. Použití přípravků pocházejících z kůry bujarníku johimbe (Pausinystalia johimbe) je dle nařízení (ES) č. 1925/2006 zakázáno. Konzumace potraviny s obsahem yohimbinu může vést k poškození zdraví. Obsah internetových stránek dále závažným způsobem porušuje právní předpisy. Před nákupem varuje Česká obchodní inspekce a Státní zemědělská a potravinářská inspekce. Více zde: https://www.potravinynapranyri.cz/EDetail.aspx?id=75', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'nauto', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'crocspraha', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'beautyville', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'laureshop', 
//  description: 'Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „nákupní galerii“, jejímž prostřednictvím údajně jsou nabízeny nevyzvednuté zásilky z Amazonu. Podle informací, které má ČOI k dispozici, někteří spotřebitelé marně čekají na doručení objednaného a uhrazeného zboží a dále jsou jim údajně strhávány další částky z platebních karet. Má se jednat zřejmě o společnosti se sídlem v USA, u které je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'adoptovatvcelu', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vip-brands', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tevabratislava', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'botytoms', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pulsni-oxymetrcz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'skechersbotyobuv', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'shop5.shopsoutlet2021', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'onrunningboty', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'shop18.onlinefactory2021', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'botyvanslevne', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'calvinkleinlevne', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bestlive', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'modaaz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'superlevnecz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tevapraha', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fashionyes', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'oblecsito', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'urotrincz.peoplebests', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce varuje i Státní ústav pro kontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'central2013', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce varuje i Státní ústav pro kontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lobkdulj.wellzdravs', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce varuje i Státní ústav pro kontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tevaczechrepublic', 
//  description: 'Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'urotrin1cz.doctordays', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce varuje i Státní ústav pro kontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zdravydetox', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'doctorlights', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce varuje i Státní zemědělská a potravinářská inspekce. Viz: https://www.potravinynapranyri.cz/EDetail.aspx?id=73', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'gmtpcy', 
//  description: 'Stránka nabízí údajný přípravek na spokojený a dlouhý život až do 120 let. Na webu je pak nabízen přípravek, který propaguje MUDr. Jan Valšovský. Tento údajný lékař nemá žádný záznam na univerzitě, ani v jiné seriózní instituci. Fotka je stažena z fotobanky, jde o smyšleného odborníka. Na stánkách je pak formulář pro objednání produktu. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce. Viz: https://www.coi.cz/gmtpcy/', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.optimovend', 
//  description: 'Nabízený výrobek vzbuzuje dojem, že je léčivým přípravkem. Ve skutečnosti se jedná o doplněk stravy. Uvedený odborník je smyšlený, fotka stažena z fotobanky. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'breedenesintacon', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce varuje i Státní ústav pro kontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz1.flekobalm', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce varuje i Státní ústav pro kontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'neocard-cz.lillyblock', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce varuje i Státní ústav pro kontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'clogscz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz2.prostatricum', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce varuje i Státní ústav pro kontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'diapromin-cz.peoplestorry', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce varuje i Státní ústav pro kontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'margginkcorcite', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje. Stránky mají jinou podobu při příchodu proklikem z reklamy, než při přímém zadání url adresy. Na webu je uveden lékař Karel Havlíček, údajný ředitel Národního lékařského vědeckého centra. Tento údajný lékař nemá žádný záznam na univerzitě, ani v jiné seriózní instituci. Fotka je stažena z fotobanky, jde o smyšleného odborníka. Viz: https://www.coi.cz/margginkcorcite/', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'ondimarandcon', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje. Stránky mají jinou podobu při příchodu proklikem z reklamy, než při přímém zadání url adresy, viz: https://www.coi.cz/ondimarandcon/', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'relatoncz.zdorovieludi', 
//  description: 'Stránky neobsahují dostatečné obchodní podmínky, současná podoba webu hrubě odporuje právním předpisům. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'dentvilleclinic', 
//  description: 'Jedná se o reklamní webovou stránku, kde je prezentován výrobek Relaton, který údajně pomáhá odstranit potíže se sluchem a zabránit hluchotě. Prezentovaný výrobek vzbuzuje dojem, že je léčivým přípravkem. Ve skutečnosti se jedná o potravinu. V textech na webové stránce jsou v souvislosti s potravinou Relaton používána tzv. léčebná tvrzení a neschválená zdravotní tvrzení o propagované potravině v rozporu s právními předpisy. Na této webové stránce sice není možné výrobek Relaton objednat, ale je zde přímý interaktivní proklik do e-shopu na webové stránce https://relatoncz.zdorovieludi.com/?country_code=CZ, který nabízí k prodeji zmíněný výrobek v rozporu s právními předpisy. Na webové stránce jsou uvedeny zavádějící informace, na základě kterých se může spotřebitel domnívat, že jsou provozovány Českou společností otorinolaryngologie a chirurgie hlavy a krku. Stránky neobsahují dostatečné obchodní podmínky, současná podoba webu hrubě odporuje právním předpisům. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz-gadgets.trackey', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'health-blog', 
//  description: 'Stránky se prezentují jako zpravodajský portál, který popisuje údajný zázračný trik na hubnutí. Na stránkách je pak nabízen neznámý výrobek na hubnutí. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce. Viz: https://www.coi.cz/health-blog/', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'newadvanceremedy', 
//  description: 'Stránky zveřejňují rozhovor s údajnou lékařkou, tou má být má být prof. MUDr. Lýdie Kovaříková, viz:https://www.coi.cz/newadvanceremedy/. Tato údajná lékařka nemá žádný záznam na univerzitě, ani v jiné seriózní instituci. Fotka je stažena z fotobanky, jde o smyšleného odborníka. Stránky pak nabízejí neznámý výrobek proti papalomavirům. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'opportunitysense', 
//  description: 'Stránka se otevře teprve po rozkliknutí spamu, který se šíří e-mailem. Stránka vytváří dojem, že mladý Čech přišel na to, jak bez námahy vydělat spoustu peněz na kryptoměnách. Stránka pak láká spotřebitele zadat údaje do formuláře dole pod textem a údajně investovat do zázračného zbohatnutí v kryptoměnách. Ve skutečnosti se jedná jen o získání citlivých údajů a peněz od důvěřivých lidí, nejedná se o žádnou zaručenou cestu výdělku, jak web prezentuje. Před těmito stránkami ČOI varuje, web je anonymní a údajně zaručené zbohatnutí se opírá o zkreslená fakta. Viz print screen: https://www.coi.cz/opportunitysense/', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'scratch-removercz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zvetsovaci-bryle-cz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: '3fazova-ostricka-cz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'univerzalni-bryle-na-cteni-cz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'puradone', 
//  description: 'Na stránkách je nabízen neznámý produkt jako léčivo, ačkoli nebyl schválen Státním ústavem pro kontrolu léčiv. Jako prodejce uveden subjekt se sídlem v Moskvě, jehož totožnost je obtížné ověřit. Obchodní podmínky zcela chybí a spotřebitel neví, vůči komu může nárokovat svá práva. Web zásadním způsobem porušuje právní předpisy České republiky. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav pro kontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cbdooil-domm', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav pro kontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'titaskin', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Uvedena pouze adresa podnikatelského subjektu v Číně pro zasílání reklamací. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'progettidivini', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mc-go', 
//  description: 'Stránky zveřejňují rozhovor s údajným lékařem, tím má být lékař Karel Havlíček, který má údajnou praxi 32 let, avšak to by byl muž věk cca 60 let, což fotka, která je u jména, této skutečnosti neodpovídá, viz: https://www.coi.cz/mc-go-ml/. Tento domnělý vědec, údajně ředitel Národního lékařského vědeckého centra neexistuje, stejně jako uvedené centrum. Tento údajný lékař nemá žádný záznam na univerzitě, ani v jiné seriózní instituci. Fotka je stažena z fotobanky, jde o smyšleného odborníka. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'neatrichit', 
//  description: 'Stránka má jinou podobu, když uživatel přijde proklikem z reklamy (viz https://www.coi.cz/neatrichit/) a na stránce se píše o zázračném výrobku na hubnutí. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'jt-webcreation', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'seogain', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.coolbox24', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zv-go', 
//  description: 'Stránky odkazují na neexistující rozhovor s údajným lékařem, tím má být lékař Petr Havlíček. Tento domnělý věděc, údajně ředitel Národního lékařského vědeckého centra neexistuje, stejně jako uvedené centrum. Tento údajný lékař nemá žádný záznam na univerzitě, ani v jiné seriozní instituci. Fotka je stažena z fotobanky, jde o smyšleného odborníka. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce. (obr: https://www.coi.cz/zv-go/)', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'dotcurlyis', 
//  description: 'Stránky se prezentují jako oficiální lékařský portál, avšak nejde o žádný oficiální portál skutečných lékařů (https://www.coi.cz/dotcurlyis/). Na stránkách je pak nabízen pochybný výrobek, který má navrátit sluch za 28 dní. Fotka uvedená na stránkách, kde je zveřejněn údajný odborník, který údajně obdržel Nobelovu cenu, je stažena z fotobanky a jméno je smyšlené. Fotka údajně spokojených zákazníků je také stažena z fotobanky. Česká obchodní inspekce tyto stránky považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zdraviodslovanu', 
//  description: 'Stránky neobsahují dostatečné obchodní podmínky, současná podoba webu hrubě odporuje právním předpisům. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'teniskyhokaoneone', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'benuker', 
//  description: 'Stránka se otevře teprve po rozkliknutí spamu, který se šíří e-mailem. Stránka zneužívá jméno známého moderátora Leoše Mareše (viz https://pooh.cz/2021/04/17/leos-mares-zneuzivan-v-dalsim-kryptomenovem-podvodu-na-linkedin/). Článek na stránce hovoří o tom, že Leoš Mareš se objevil v pořadu „Interview ČT24“, který uváděl Daniel Takáč, a oznámil novou „mezeru v zákonech pro bohatství“, o které je prokázané, že z kohokoliv udělá za 3 až 4 měsíce milionáře. Stránka pak láká spotřebitele zadat údaje na anonymním webu primechnnls.com a investovat do zázračného zbohatnutí v kryptoměnách. Ve skutečnosti se jedná jen o získání citlivých údajů a peněz od důvěřivých lidí, nejedná se o žádnou zaručenou cestu výdělku, jak web prezentuje. Před těmito stránkami ČOI varuje, web je anonymní a údajně zaručené zbohatnutí se opírá o zkreslená fakta.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'form-ulaheart', 
//  description: 'Stránky se prezentují jako jakýsi zdravotní portál, avšak nejde o žádný oficiální portál skutečných zdravotníků (https://www.coi.cz/form-ulaheart/). Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek proti bolesti páteře a kloubů. Stránky jsou úplně stejné, jako jiný obdobný "zdravotní portál", který podobným způsobem nabízí přípravek proti vysokému krevnímu tlaku i na hubnutí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'wellness-sprchovahlavice-cz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hunterholinky', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'forcebtcofferway', 
//  description: 'Nezabezpečená platební brána, která je navázána na weby vytvářející dojem seriózních stránek nabízející až zázračné zbohatnutí. Ve skutečnosti slouží jen k zadání informací o platební kartě, kdy pak často dojde ke zneužití těchto údajů a spotřebitel je lstí připraven o své finance. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní. Před zadáním údajů na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'global-mentors', 
//  description: 'Nezabezpečená platební brána, která je navázána na weby vytvářející dojem seriózních stránek nabízející až zázračné zbohatnutí. Ve skutečnosti slouží jen k zadání informací o platební kartě, kdy pak často dojde ke zneužití těchto údajů a spotřebitel je lstí připraven o své finance. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní. Před zadáním údajů na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'beautyrefuse', 
//  description: '„Tváří“ podvodné reklamy na zbohatnutí přes kryptoměny je nově Jan Kraus. Následuje klasícký web tvářící se jako Novinky.cz na kterém je „exklusivní rozhovor pro iDnes.cz“. Stránka odkazuje čtenáře například na global-mentors.net/checkout/, kde se mnozí nechají přesvědčit k zaplacení 250 USD. Jedná se o podvodný web, před kterým ČOI varuje. Viz také: https://pooh.cz/2021/01/26/tvari-podvodne-reklamy-na-zbohatnuti-pres-kryptomeny-je-nove-jan-kraus/', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'secureifx', 
//  description: 'Stránka se otevře teprve po rozkliknutí spamu, který se šíří e-mailem. Stránka zneužívá jméno známého moderátora Leoše Mareše (viz https://pooh.cz/2021/04/17/leos-mares-zneuzivan-v-dalsim-kryptomenovem-podvodu-na-linkedin/). Článek na stránce hovoří o tom, že Leoš Mareš se objevil v pořadu „Interview ČT24“, který uváděl Daniel Takáč, a oznámil novou „mezeru v zákonech pro bohatství“, o které je prokázané, že z kohokoliv udělá za 3 až 4 měsíce milionáře. Stránka pak láká spotřebitele zadat údaje na anonymním webu primechnnls.com a investovat do zázračného zbohatnutí v kryptoměnách. Ve skutečnosti se jedná jen o získání citlivých údajů a peněz od důvěřivých lidí, nejedná se o žádnou zaručenou cestu výdělku, jak web prezentuje. Před těmito stránkami ČOI varuje, web je anonymní a údajně zaručené zbohatnutí se opírá o zkreslená fakta.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'superbinvest', 
//  description: 'Stránka se otevře teprve po rozkliknutí spamu, který se šíří e-mailem. Stránka zneužívá jméno známého moderátora Leoše Mareše. Článek na stránce hovoří o tom, že Leoš Mareš se objevil v pořadu „Interview ČT24“, který uváděl Daniel Takáč, a oznámil novou „mezeru v zákonech pro bohatství“, o které je prokázané, že z kohokoliv udělá za 3 až 4 měsíce milionáře. Stránka pak láká spotřebitele zadat údaje na anonymním webu primechnnls.com a investovat do zázračného zbohatnutí v kryptoměnách. Ve skutečnosti se jedná jen o získání citlivých údajů a peněz od důvěřivých lidí, nejedná se o žádnou zaručenou cestu výdělku, jak web prezentuje. Před těmito stránkami ČOI varuje, web je anonymní a údajně zaručené zbohatnutí se opírá o zkreslená fakta.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'worldandbitcoin', 
//  description: 'Stránka se otevře teprve po rozkliknutí spamu, který se šíří e-mailem. Stránka zneužívá jméno známého moderátora Leoše Mareše (https://www.coi.cz/euro-to-btc/). Článek na stránce hovoří o tom, že Leoš Mareš se objevil v pořadu „Interview ČT24“, který uváděl Daniel Takáč, a oznámil novou „mezeru v zákonech pro bohatství“, o které je prokázané, že z kohokoliv udělá za 3 až 4 měsíce milionáře. Stránka pak láká spotřebitele zadat údaje na anonymním webu primechnnls.com a investovat do zázračného zbohatnutí v kryptoměnách. Před těmito stránkami ČOI varuje, web je anonymní a údajně zaručené zbohatnutí se opírá o zkreslená fakta.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'redbean', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'prazska-moda', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'communityoffersdaily', 
//  description: 'Na základě smyšlených informací je tu prezentován až zázračný systém na zbohatnutí. Příběh je smyšlený. Stránky jsou anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před vyplněním údajů na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz3.cannadiabv', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý přípravek na údajnou léčbu cukrovky (https://www.coi.cz/cannabis/). Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajná firma z Panamy, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Lékař, který přípravek na stránkách propaguje, je smyšlený a jeho fotografie stažena z fotobanky. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'euro-to-btc', 
//  description: 'Stránka se otevře teprve po rozkliknutí spamu, který se šíří e-mailem. Stránka zneužívá jméno známého moderátora Leoše Mareše (https://www.coi.cz/euro-to-btc/). Článek na stránce hovoří o tom, že Leoš Mareš se objevil v pořadu „Interview ČT24“, který uváděl Daniel Takáč, a oznámil novou „mezeru v zákonech pro bohatství“, o které je prokázané, že z kohokoliv udělá za 3 až 4 měsíce milionáře. Stránka pak láká spotřebitele zadat údaje na anonymním webu primechnnls.com a investovat do zázračného zbohatnutí v kryptoměnách. Před těmito stránkami ČOI varuje, web je anonymní a údajně zaručené zbohatnutí se opírá o zkreslená fakta.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cblhota', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Dále bylo šetřením u společnosti CZ.nic zjištěno, že doména cblhota.cz je evidována na osobu Michal Veselka, nar. 12.6.1987. Následnou lustrací ze strany Policie ČR však bylo zjištěno, že uvedená osoba není vůbec vedena v registru obyvatel. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'livingzone', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Doména livingzone.cz je registrována na osobu Sabine Kohnke, bytem Fridrichsgaber Weg 124e, Norderstedt, 22848, Schleswig-Holstein, Německo, kdy její totožnost nebylo možné ztotožnit. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'dovcalevne', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'gamsgo', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.nanovein', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'nbdecstore', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'brikbrno', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hunterholinky', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.thexdrone', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lekarna-eshop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'topwebsshop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'janattwell', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hokaoneoneshop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'uggszimniboty', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'botyinov-8', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'merrelleshop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'buy.layoners', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'ishop-cz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'eyewear4you', 
//  description: 'Stránka zneužívá Show Jana Krause a Simonu Krainovou, která nemá s uvedeným webem nic společného. Jde o zneužití jména slavné osobnosti bez jejího vědomí. Autoři programu Show Jana Krause ČOI potvrdili, že se jedná o zneužití jejich pořadu. Cílem je prodat důvěřivým spotřebitelům neznámý přípravek na hubnutí. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kolimnc', 
//  description: 'Stránky se prezentují jako jakýsi zdravotní portál, avšak nejde o žádný oficiální portál skutečných zdravotníků (https://www.coi.cz/kolimnc/). Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek proti bolesti páteře a kloubů. Stránky jsou úplně stejné, jako jiný obdobný "zdravotní portál", který podobným způsobem nabízí přípravek proti vysokému krevnímu tlaku i na hubnutí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.adamourv', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt na problémy s erekcí. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena společnost z Panamy, která figuruje u mnoha jiných rizikových e-shopů, které nabízejí celou řadu dalších neznámých výrobků např. na hubnutí, proti kouření, na prostatu, na klouby, srdeční hypertenzi a další. Recenze a odborníci jsou smyšlení. Například lékař Мichal Verner, který přípravek na stránkách propaguje, nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ani ve specializovaném ústavu. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'shoptoptovar', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'airselfiecamera', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'foggie', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'sleva24', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'czsale.2021shoponline', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.wlosnd', 
//  description: 'Na základě smyšlených informací je tu prezentován neznámý přípravek na zhubnutí. Na stránkách jsou pak recenze údajně spokojených uživatelů, tyto recenze jsou však smyšlené - na jiných verzích stránek v jiném jazyce existují stejné fotografie u recenzí, avšak jiná jména (dle jazyka). Příběh je smyšlený, provozovatel je uveden na celé řadě dalších rizikových webů nabízející obdobné rychlé řešení problémů se zdravím. Nákup zde za rizikový považuje Česká obchodní inspekce, stránky jsou anonymní na blíže nespecifikovanou zahraniční firmu a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'primechnnls', 
//  description: 'Stránka láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Míří sem spotřebitelé nejen z reklamních lživých e-mailů, kde zázračné zbohatnutí má slibovat Leoš Mareš, jde však o smyšlené údaje a rozhovor, který neexistoval. Stránka zneužívá kryptoměny k nalákání dalších na údajné investice a zázračné zbohatnutí a periodicky obměňuje příběh a mění domény. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'europebitcoinlab', 
//  description: 'Stránka se otevře teprve po rozkliknutí spamu, který se šíří e-mailem. Stránka zneužívá jméno známého moderátora Leoše Mareše (https://www.coi.cz/europebitcoinlab/). Článek na stránce hovoří o tom, že Leoš Mareš se objevil v pořadu „Interview ČT24“, který uváděl Daniel Takáč, a oznámil novou „mezeru v zákonech pro bohatství“, o které je prokázané, že z kohokoliv udělá za 3 až 4 měsíce milionáře. Stránka pak láká spotřebitele zadat údaje na anonymním webu primechnnls.com a investovat do zázračného zbohatnutí v kryptoměnách. Před těmito stránkami ČOI varuje, web je anonymní a údajně zaručené zbohatnutí se opírá o zkreslená fakta.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'skvela-moda', 
//  description: 'Web slouží jako nákupní galerie, chybí zde identifikační údaje provozovatele webu, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Jako dodavatelé (prodávající) jsou nedostatečně identifikované subjekty se sídlem v Asii. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.onlinecheap2021', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vivobarefootpraha', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'nbcz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'jeskyne-pokladu', 
//  description: 'Na stránkách chybí identifikační a kontaktní údaje provozovatele webu, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'karymy', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'topshop-eu', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'microbiologybytes', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'adboty-eshop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pumaoutletpraha', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'orislevy-vyprodej-brno.webnode', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'inftnity', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fotbaloveobleceni', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'akce', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zlatska', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'extratopia', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lezuvmezu', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'botykeenvyprodej', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'slevakupon', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'annivett', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'keenfootwearsk', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'gladmomentum', 
//  description: 'Stránka se prezentuje jako výherní a nabízí poukázku v hodnotě 8 500 Kč do řetezce Albert (viz https://www.coi.cz/gladmomentum/). Ve skutečnosti se spotřebitel poukázky nedočká. Stránku neprovozuje společnost Albert. Jedná se o zneužití loga společnosti. Před vyplněním osobních údajů na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'millie-bobby', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'polixcd', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'nikesleva', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'merkiv', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.coprv', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý konopný přípravek na kloupy. Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajná firma z Panamy, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Lékař, který přípravek na stránkách propaguje, je smyšlený a jeho fotografie stažena z fotobanky. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'koupelevne', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.cardilinev', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt na léčbu srdeční hypertenze. Jedná se však o neznámý přípravek, který má sloužit k léčbě, aniž by byl schválen Státním ústavem pro kontrolu léčiv. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena společnost z Panamy. Na stránkách probíhá odpočítávání času, po který uvedená nabídka platí, avšak časomíra se vrací zpět, jde o nekalou obchodní praktiku a nátlak na spotřebitele, aby nakoupil a neměl čas o nabídce přemýšlet. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'umbler', 
//  description: 'Stránky parazitují na České poště (viz https://www.coi.cz/umbler/) a pod hlavičkou České pošty se snaží vyvolat dojem, že uživatel pro doručení zásilky od České pošty musí zaplatit ještě nepatrný doplatek. Jedná se o nezabezpečenou platební bránu na anonymních stránkách, která vyzývá k úhradě (údajně za clo). Na stránky se lidé dostanou ze spamu, který je také podvrh a vypadá, jako by výzvu k úhradě rozesílala Česká pošta. Před vyplněním údajů na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'helebarvy', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zuzutv', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.levne2021', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'jbstra', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'green-andblacktea', 
//  description: 'Stránky se prezentují jako Český lékařský portál, avšak nejde o žádný oficiální portál skutečných lékařů (obr.: https://www.coi.cz/green-andblacktea/). Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek údajně proti infarktu. Stránky jsou úplně stejné, jako jiný obdobný "lékařský portál", který podobným způsobem nabízí přípravek na klouby. Fotka údajně spokojených zákazníků je stažena z fotobanky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'prodejs', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'obchod.themrvita', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz3.landlrev', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'nizamsecureoffer', 
//  description: 'Stránka láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Míří sem spotřebitelé nejen z reklamních lživých stránek, kde zázračné zbohatnutí má slibovat i premiér ČR Andrej Babiš (https://www.coi.cz/servingyourpharmacy-com), jde však o smyšlené údaje a rozhovor, který neexistoval. Stránka zneužívá kryptoměny k nalákání dalších na údajné investice a zázračné zbohatnutí a periodicky obměňuje příběh a mění domény. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'btsystemos', 
//  description: 'Stránka láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Míří sem spotřebitelé nejen z reklamních lživých stránek, kde zázračné zbohatnutí má slibovat i premiér ČR Andrej Babiš (https://www.coi.cz/servingyourpharmacy-com), jde však o smyšlené údaje a rozhovor, který neexistoval. Stránka zneužívá kryptoměny k nalákání dalších na údajné investice a zázračné zbohatnutí a periodicky obměňuje příběh a mění domény. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'ziirewopi', 
//  description: 'Stránka zneužívá logo České televize, TV Prima i TV Nova (viz https://www.coi.cz/ziirewopi/). Zároveň ukazuje premiéra Andreje Babiše a odkazuje na rozhovor o zázračném zbohatnutí, který je smyšlený. Jedná se o lživou stránku s cílem vyvolat v lidech falešný pocit, že rychle zbohatnou. Stránka pak každým proklikem míří na anonymním web btsystemos.com a tam právě má spotřebitel investovat své peníze a má ho čekat zázračné zbohatnutí na kryptoměnách. Před těmito stránkami ČOI varuje, web je anonymní a informace o zaručeném zbohatnutí se opírají o lživá tvrzení.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz3.landntrv', 
//  description: 'Na stránkách je nabízen dron. Provozovatel je uveden na celé řadě dalších rizikových webů nabízející pro změnu řešení různých zdravotních potíží. Nákup zde za rizikový považuje Česká obchodní inspekce, stránky jsou anonymní na blíže nespecifikovanou zahraniční firmu a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.prodej2021', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'p1.geradot', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'columbiaeshop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'alofixa', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'twhjbyje.medicphytos', 
//  description: 'Na stránce je propagován výrobek hercem Jiřím Lábusem, avšak ten se proti tomu ohradil veřejně (https://www.idnes.cz/zpravy/domaci/labus-jagr-kamenna-erekce-podvojne-stranky-neschvaleny-lek-sukl.A210331_110507_domaci_kzem). Stránka zveřejňuje Lábusovu fotografii, jak čte scénář a na stole má přitom zmíněný lék. Z fotografie je na první pohled jasné, že obrázek léku je tam přidán po grafické úpravě. Do třetice je uveden urolog, „doktor lékařské vědy“ (nic takového neexistuje), profesor urologie, Jan Volek. V České lékařské komoře najdeme jediného Jana Volka, který promoval v r.2010, takže je skoro vyloučeno, aby to pár let po atestaci dotáhl na profesora urologie. Navíc tento Jan Volek nemá žádné údaje o odbornosti ani o atestaci. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.landevrv', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý přípravek na krevní tlak. Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajná firma z Panamy, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'botybrooks', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'unibrus', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mollio', 
//  description: 'Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „nákupní galerii“, jejímž prostřednictvím údajně zboží nabízejí externí zahraniční subjekty. Má se jednat zřejmě o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. Na internetových stránkách nejsou uvedeny podrobné údaje (např. adresa sídla, registrační číslo apod.) o těchto údajných prodávajících ani jejich kontaktní údaje. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. V době objednání zboží se zboží může stále nacházet v Asii. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'juum', 
//  description: 'Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „nákupní galerii“, jejímž prostřednictvím údajně zboží nabízejí externí zahraniční subjekty. Má se jednat zřejmě o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. Na internetových stránkách nejsou uvedeny podrobné údaje (např. adresa sídla, registrační číslo apod.) o těchto údajných prodávajících ani jejich kontaktní údaje. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. V době objednání zboží se zboží může stále nacházet v Asii. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'grafarna', 
//  description: 'Na stránkách zcela chybí obchodní podmínky či jiným způsobem dostupné povinné údaje prodávajícího. Web zásadním způsobem porušuje české zákony a spotřebitel neví, vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz1.ketodieti', 
//  description: 'Na základě smyšlených informací prezentován neznámý přípravek na zhubnutí. Na stránkách je příběh osoba, která měla údajně zhubnout. Příběh je smyšlený, provozovatel je uveden na celé řadě dalších rizikových webů nabízející obdobné rychlé řešení problémů se zdravím. Nákup zde za rizikový považuje Česká obchodní inspekce, stránky jsou anonymní na blíže nespecifikovanou zahraniční firmu a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lukasuhlir', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'gotocmall', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'beunio', 
//  description: 'Ačkoliv e-shop cílí i na české spotřebitele (ceny jsou uváděny v českých korunách), tak veškeré informace na stránkách jsou pouze v anglickém jazyce. Dále zde absentují identifikační údaje prodávajícího - pouze z informace o rozhodném právu uvedené v obchodních podmínkách lze usuzovat, že provozovatelem internetových stránek je subjekt sídlící v USA. Stránky jsou tedy anonymní, jako provozovatel webu není uveden nikdo a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'polikax', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vasesleva', 
//  description: 'Důvod zveřejnění: Podle informací na stránkách je prodávajícím společnost sídlící v USA, obchodní podmínky jsou však nedostatečné a svým obsahem porušují právní předpisy ČR. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'levneoutdoorboty', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. V rámci provedeného šetření bylo zjištěno, že uvedený eshop nesplňuje základní podmínky - není uveden provozovatel, není uvedeno IČ ani sídlo, žádné kontaktní údaje. Policejní orgán se pokusil o registraci a následný nákup, kdy bylo zjištěno, že tento je možný pouze při platbě platební kartou předem online a to nikoli cestou zabezpečené platební brány. Před nákupem na těchto stránkách varuje Policie ČR a Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'outdoorbotylevne', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. V rámci provedeného šetření bylo zjištěno, že uvedený eshop nesplňuje základní podmínky - není uveden provozovatel, není uvedeno IČ ani sídlo, žádné kontaktní údaje. Policejní orgán se pokusil o registraci a následný nákup, kdy bylo zjištěno, že tento je možný pouze při platbě platební kartou předem online a to nikoli cestou zabezpečené platební brány. Před nákupem na těchto stránkách varuje Policie ČR a Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vagabondboty', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.levny2021', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'botyconversecz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.ketodietv', 
//  description: 'Na základě smyšlených informací prezentován neznámý přípravek na zhubnutí. Na stránkách je příběh osoba, která měla údajně zhubnout. Příběh je smyšlený, provozovatel je uveden na celé řadě dalších rizikových webů nabízející obdobné rychlé řešení problémů se zdravím. Nákup zde za rizikový považuje Česká obchodní inspekce, stránky jsou anonymní na blíže nespecifikovanou zahraniční firmu a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'habitdusk', 
//  description: 'Stránka má jinou podobu, když uživatel přijde proklikem z reklamy (viz https://www.coi.cz/habitdusk/) a na stránce se píše o zázračném výrobku pro navrácení zraku: "10 minut denně. Přesně tolik je potřeba, aby byl za 21 dní váš zrak plně obnoven: bez ohledu na typ vady nebo její závažnost". Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kiturec', 
//  description: 'Stránka má jinou podobu, když uživatel přijde proklikem z reklamy (viz https://www.coi.cz/kiturec/) a na stránce se píše, že "vynález umožňuje každému získat zpět svůj zrak do 21dnů". Na webu je pak nabídka prodeje neznámého výrobku. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mynutraresearch', 
//  description: 'Stránky odkazují na neexistující rozhovor s údajným lékařem, tím má být lékař Michal Koláček. Tento domnělý věděc však nemá žádný záznam na univerzitě, ani v jiné seriozní instituci. Fotka je stažena z fotobanky, jde o smyšleného odborníka. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav prokontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fixmyppcc', 
//  description: 'Stránka píše o oficiálním varování Ministerstva zdravotnictví, toto varování je však smyšlené. Dr. Otokara Zemo, který je na stránkách uveden, nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ani ve specializovaném ústavu. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.cannajv', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý konopný přípravek na kloupy. Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajná firma z Panamy, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Lékař, který přípravek na stránkách propaguje, je smyšlený a jeho fotografie stažena z fotobanky. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'datalistshop', 
//  description: 'Stránky nabízejí seznam firem a jejich adresy za peníze. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'realwood-cz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'czmedshop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'outlet2021', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'foto-vize', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'motorwarenhuis', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'politercy', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'health-news-2021', 
//  description: 'Stránky vypadají jako zpravodajský portál a píší o téměř zázračné metodě na hubnutí .Lenka Klapková, která je zmíněna, je smyšlená osoba, fotky jsou staženy a celý příběh není reálný. Stejně tak prof. Miroslav Trojan, který je na stránkách uveden, nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ani ve specializovaném ústavu. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'thecrazycalls', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'newdailygoals-on', 
//  description: 'Stránky se prezentují jako jakýsi zdravotní portál, avšak nejde o žádný oficiální portál skutečných zdravotníků. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek proti bolesti páteře a kloubů. Stránky jsou úplně stejné, jako jiný obdobný "zdravotní portál", který podobným způsobem nabízí přípravek proti vysokému krevnímu tlaku i na hubnutí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'columbiaobchod', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'asicsbezeckeboty', 
//  description: 'Společnost ASICS Austria GmbH se obrátila na Českou obchodní inspekci s tím, že tyto stránky neprovozuje. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'modendi', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cs.uzasnenabidky24', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vyrobenoslaskousr', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mnaulo', 
//  description: 'Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „nákupní galerii“, jejímž prostřednictvím údajně zboží nabízejí externí zahraniční subjekty. Tito údajní zahraniční dodavatelé nejsou na internetových stránkách identifikováni a spotřebitel tedy neví, s kým by měl uzavírat smlouvu. Má se jednat zřejmě o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci. Je-li dostupnost označena např. výrazem „skladem“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné nebo nemožné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'powerglasses.co', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'outletonline2021', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bigberthaoriginal', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'prevska', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fildago', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'change-of-assets', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mlpa', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cpagettimain', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt na léčbu srdeční hypertenze. Jedná se však o neznámý přípravek, který má sloužit k léčbě, aniž by byl schválen Státním ústavem pro kontrolu léčiv. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena společnost z Panamy. Na stránkách probíhá odpočítávání času, po který uvedená nabídka platí, avšak časomíra se vrací zpět, jde o nekalou obchodní praktiku a nátlak na spotřebitele, aby nakoupil a neměl čas o nabídce přemýšlet. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.technoweek', 
//  description: 'Na webu je nabízen údajně „zázračný“ přístroj na úsporu elektrické energie. Nic takového však z hlediska fyzikálních zákonů (že přístroj vložený do zásuvky ve finále šetří elektrickou energii) není možné. Ani není zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'airydress', 
//  description: 'Při pokusu spotřebitele odstoupit od kupní smlouvy bylo nabídnuto pouze vrácení poloviny uhrazené sumy. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'herzgebirge', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hodinekrepliky', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'columbiaslovensko', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'greenbiliard', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'skincarezlicin', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Na webu je nabízen neznámý přípravek proti plísním nehtů. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vjehlici', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'orcela', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'discount.shoponline2020', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bonky', 
//  description: 'Česká obchodní inspekce registruje řadu stížností, které se internetových stránek týkají. Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „nákupní galerii“, jejímž prostřednictvím údajně zboží nabízejí externí zahraniční subjekty. Má se jednat zřejmě o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem ihned k odeslání“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lookbrew', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'shopcz.sweetshoppingathome', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'originalgoodsinternational', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'alzaland', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'heygamersnort', 
//  description: 'Stránky nabízejí rychlé zbohatnutí. Jako provozovatel webu není uveden nikdo, stránky neobsahují dostatečné obchodní podmínky, současná podoba webu hrubě odporuje právním předpisům. Před registrací na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.ceskysystem.zulole25', 
//  description: 'Stránky nabízejí rychlé zbohatnutí. Jako provozovatel webu není uveden nikdo, stránky neobsahují dostatečné obchodní podmínky, současná podoba webu hrubě odporuje právním předpisům. Před registrací na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.vzorek-zdarma', 
//  description: 'Stránky údajně nabízejí vzorek zdarma, avšak často mění firmu, v rámci které údajně vystupují (nejčastěji řetězec). Nakonec spotřebitelé jsou nuceni vyplnit osobní údaje, telefon, e-mail a adresu, vzorku zdarma se nedočkají. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před vyplněním osobních údajů na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'moveflexcz.moveflexofficial', 
//  description: 'Stránky nabízejí neznámý výrobek na klouby. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.hemorexallb', 
//  description: 'Stránky nabízejí neznámý výrobek proti hemoroidům. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'magicdealrp', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'czsale2021', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'naturebaby', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: '24shop-cz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'katalogseakers', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'edensport', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'rt-export', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'uggslovensko', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: '09.boskop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'life-changings-facts', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hollistereshop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'filasleva', 
//  description: 'Spotřebitelka zaplatila za boty a dopravu dohromady cca 1600 Kč předem. Opakovaně provozovatele kontaktovala přes formulář, nikdo nereaguje. Výrobky objednány v říjnu a stále zboží nedorazilo, prodejce je nekontaktní. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: '4blok', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'nakupovo', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fotbalovy-fanshop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tylda', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'shoppingclub', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tryitnow', 
//  description: 'Na stránkách je zneužito jméno prof. MUDr. Jana Pirka, DrSc. a ten se již pro média vůči této prezentaci ohradil, nemá s těmito stránkami nic společného. Uvedené webové stránky zneužily jméno slavného českého kardiochirurga. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje. Viz: https://www.blesk.cz/clanek/zpravy-udalosti/665732/znamy-lekar-v-soku-smejdi-jeho-jmenem-prodavaji-zazrak-na-cevy-pirk-zasahuje-mi-to-do-zivota.html', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'thiyas', 
//  description: 'Na základě spamů v e-mailech jsou spotřebitelé odkázaní na Raiffeisenbank, avšak nejedná se o skutečné stránky banky, viz obr.: https://www.coi.cz/rb/ Jedná se o zneužití loga a grafického vzhledu webových stránek skutečné banky. Jakékoli zadání údajů na stránkách nedoporučujeme, mohlo by dojít ke zneužití. Česká obchodní inspekce před těmito stránkami důrazně varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fortmediatech', 
//  description: 'Stránky vypadají jako oficiální portál České pošty (obr.: https://www.coi.cz/cpost2/) a přichází do mailu ve spamu tato zpráva (https://www.coi.cz/cpost/). Celé stránky klamou spotřebitele tím, že vypadají jako oficiální portál České pošty a čekají na zadání údajů o platební kartě. ČOI informovala Českou poštu a varuje spotřebitele před tímto rizikovým webem.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'svarecky-velkoobchod', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'eccoobchod', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'megamoravia', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'excolov', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'starkuvdum', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'aizen', 
//  description: 'Po zaplacení přišlo zcela jiné zboží, na urgence spotřebitele nikdo nereaguje. Spotřebitel se obrátil na Českou obchodní inspekci. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vansbotylevne', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vansskosalg', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vans-sleva', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cornavllc', 
//  description: 'Na tuto stránku jsou uživatelé ve spamu odkazováni s tím, že se má jednat o nové naplánování doručení zásilky přepravcem DPD. Nejedná se však o žádnou oficiální stránku žádného přepravce. Před vstupem na tyto stránky Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz-prihlaseni', 
//  description: 'Na tuto stránku jsou uživatelé ve spamu odkazováni s tím, že se má jednat o ověření účtu Fio banky. Nejedná se však o žádnou oficiální stránku Fio banky. Před vstupem na tyto stránky Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'ecobydleni', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.smart-topstore', 
//  description: 'Z těchto stránek si spotřebitel objednal dvě masážní zařízení, přišlo jedno. Po rozbalení přístroje byla vidlice napájecího adaptéru zlomená a z bezpečnostních důvodů spotřebitel ani přístroj nepoužil. Snažil se odsoupit od kupní smlouvy, ale nikdo nereaguje. Stránky nemají informaci o provozovateli (žádné IČO), prodejce je nekontaktní a hrubě porušuje zákon o ochraně spotřebitele například tím, že neumožní vrátit zboží do 14 dnů bez udání důvodu. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'eccoeshopcz', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bezeckyklubbrno', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím jsou především kšiltovky. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'new-promotions24', 
//  description: 'Stránka tvrdí, že mladík vymyslel vynález, který umožní vrátit zrak do 21 dnů. Na internetové stránky se dostanete nejčastěji na základě spamů v elektronické poště. Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajně firma, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Odborníci, kteří přípravek na stránkách propagují, jsou smyšlení a fotografie staženy z fotobanky. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'nevergiveupyourmind', 
//  description: 'Stránka tvrdí, že mladík vymyslel vynález, který umožní zcela obnovit zrak do 21 dnů. Na internetové stránky se dostanete nejčastěji na základě spamů v elektronické poště. Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajně firma, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Odborníci, kteří přípravek na stránkách propagují, jsou smyšlení a fotografie staženy z fotobanky. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fotbalovedresycz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav prokontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'sleva.onlinesale2020', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'uggsleva', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'minibusypraha', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz4.predstavitltd', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý přípravek na prostatu. Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajně firma, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Odborníci, kteří přípravek na stránkách propagují, jso smyšlení a fotografie staženy z fotobanky. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cpagettipotokk8', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý přípravek na hubnutí. Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajně firma, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Odborníci, kteří přípravek na stránkách propagují, jso smyšlení a fotografie staženy z fotobanky. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'artresinplus', 
//  description: 'Stránky nabízejí neznámý výrobek proti bolesti. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'top-sales24', 
//  description: 'Stránky se prezentují jako jakýsi zdravotní portál, avšak nejde o žádný oficiální portál skutečných zdravotníků. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek proti bolesti páteře a kloubů. Stránky jsou úplně stejné, jako jiný obdobný "zdravotní portál", který podobným způsobem nabízí přípravek proti vysokému krevnímu tlaku i na hubnutí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'offerinfor24', 
//  description: 'Stránky se prezentují jako jakýsi zdravotní portál, avšak nejde o žádný oficiální portál skutečných zdravotníků. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek proti infarktu. Stránky jsou úplně stejné, jako jiný obdobný "zdravotní portál", který podobným způsobem nabízí přípravek na klouby i na hubnutí. Fotka údajně spokojených zákazníků je stažena z fotobanky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'czdialine.phytosbest', 
//  description: 'Stránky prezentují neznámý výrobek pro diabetiky. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní zemědělská a potravinářská inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'nfldresylevnecz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bettertbuy', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'globalpromotiontool', 
//  description: 'Stránky se prezentují jako Český zdravotní portál, avšak nejde o žádný oficiální portál skutečných zdravotníků. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek proti infarktu. Stránky jsou úplně stejné, jako jiný obdobný "zdravotní portál", který podobným způsobem nabízí přípravek na klouby i na hubnutí. Fotka údajně spokojených zákazníků je stažena z fotobanky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cpgtstream8', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt na vysoký krevní tlak. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena společnost z Panamy, která figuruje u mnoha jiných rizikových e-shopů, které nabízejí celou řadu dalších neznámých výrobků např. na hubnutí, proti kouření, na prostatu, na klouby, srdeční hypertenzi a další. Recenze a odborníci jsou smyšlení. Například lékař Ondřej Pumpr, který přípravek na stránkách propaguje, nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ani ve specializovaném ústavu. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'servingyourpharmacy', 
//  description: 'Stránka zneužívá logo České televize, TV Prima i TV Nova. Zároveň ukazuje premiéra Andreje Babiše a odkazuje na rozhovor o zázračném zbohatnutí, který je smyšlený - viz https://www.coi.cz/servingyourpharmacy-com/ - v článku se píše, že premiér oznámil novou „mezeru v zákonech pro bohatství“, navíc je prý prokázané, že z kohokoliv udělá za 3 až 4 měsíce milionáře. Obrázek zde https://www.coi.cz/servingyourpharmacy-com2/ Jedná se o lživou stránku s cílem vyvolat v lidech falešný pocit, že rychle zbohatnou. Stránka pak každým proklikem míří na anonymním web https://ultraforcebtcoffers.com/knab/ a tam právě má spotřebitel investovat své peníze a má ho čekat zázračné zbohatnutí na kryptoměnách. Před těmito stránkami ČOI varuje, web je anonymní a informace o zaručeném zbohatnutí se opírají o lživá tvrzení.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.onlinecheap2020', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'sleva.factory2021', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'brixtonballs', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'prodejbotpuma', 
//  description: 'Podle informací od spotřebitele po objednání dvou párů značkových bot dorazil po měsíci pouze jeden pár bot a navíc, dle spotřebitele, značeně kvalitou pod úrovní bot z tržnice. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'ultraforcebtcoffers', 
//  description: 'Stránka láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Míří sem spotřebitelé nejen z reklamních lživých stránek, kde zázračné zbohatnutí má slibovat i premiér ČR Andrej Babiš (https://www.coi.cz/servingyourpharmacy-com), jde však o smyšlené údaje a rozhovor, který neexistoval. Stránka zneužívá kryptoměny k nalákání dalších na údajné investice a zázračné zbohatnutí a periodicky obměňuje příběh a mění domény. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'dropshiper', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav prokontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'eccoutlet', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav prokontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fotbalovemall', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav prokontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cpagettigeneral2', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý přípravek proti bolestem zad a kloubů. Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajně firma, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Lékař Jan Goluša, který přípravek na stránkách propaguje, je smyšlený a jeho fotografie stažena z fotobanky. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'thebtcwaves', 
//  description: 'Stránka pak láká spotřebitele zadat údaje na anonymním webu a investovat do zázračného zbohatnutí v kryptoměnách. Před těmito stránkami ČOI varuje, web je anonymní a údajně zaručené zbohatnutí se opírá o zkreslená fakta.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'world-newse', 
//  description: 'Stránky vypadají jako zpravodajský portál, zneužívají známý vzhled stránek ČT24. V článku se píše, že "Svobodná matka si za rok vydělala ve volném čase $89.844, aniž by něco musela prodávat". Jde o lživou informaci s cílem nalákat čtenáře k investici kryptoměn. Prokliky na webu spotřebitele přesměrují na web thebtcwaves.com/cz/, kde jsou lákáni poslat peníze do údajného systému, který má na základě investicí do Bitcoinu spotřebiteli výhradně vydělat. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'health-and-beauty-4you', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav prokontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'nirt.co', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav prokontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'recenzetop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav prokontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.irecommendz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav prokontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tv24news', 
//  description: 'Stránky nabízejí údajný přípravek na hubnutí. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'alloverbodysupport', 
//  description: 'Stánka, jejíž print screen máme zde: https://www.coi.cz/alloverbodysupport/ , zobrazují různé verze článků o téměř zázračném výrobku na vyhlazení vrásek. Článek má vzbudit ve čtenáři důvěru, že se jedná o něco mimořádného, unikátního a že by výrobek měl zakoupit. Stránky však odkazují na další web, kde je možné přistoupit k objednávce produktu. Avšak produkt je neznámý a jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'infoscrolling', 
//  description: 'Stránky nabízející údajný přípravek na hubnutí jsou zcela anonymní. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'medicalnews24', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'drmartenssleva', 
//  description: 'Podle informací od spotřebitelky po zaplacení dvou párů bot (za 5600 Kč) zboží nepřichází a banka odhalila údajné pokusy o vybrání peněz v zahraničí, či nepovolené pokusy o další transakce, následně banka platební kartu zablokovala. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'czfotbalshop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'topteam-preland', 
//  description: 'Stránky mají vzbuzovat zdání, že jde o oficiální zpravodajský server a v článku se hovoří o tom, že geniální český student přišel na to, jak do dvou dní vyléčit bez lékařského zákroku prostatitidu, viz https://www.coi.cz/prostata/ a celý příběh je smyšlený. Webové stránky navigují spotřebitele k nákupu neznáméno přípravku s "úžasnou slevou 50 %", která má motivovat k zadání osobních údajů pro objednávku. Jako provozovatel webu není uveden nikdo, stránky uvádějí lživé informace a jsou zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'wwnews24', 
//  description: 'Stránky mají vzbuzovat zdání, že jde o oficiální zpravodajský server a v článku se hovoří o tom, že Hana Horvathová - uroložka, přišla na to, jak obnovit "ztracenou sílu ve stáří". Avšak taková uroložka je zcela smyšlená. Webové stránky navigují spotřebitele k nákupu neznáméno přípravku na"obnovení ztracené síly ve stáří". Na stránce je možnost si vylosovat "náhodně" slevu, vždy je na výherném kole vylosována sleva 50 %, která má motivovat k zadání osobních údajů pro objednávku. Jako provozovatel webu není uveden nikdo, stránky uvádějí lživé informace a jsou zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'goforthebest24', 
//  description: 'Internetové stránky, které vypadají jako zpravodajský web, prezentují neznámý přípravek na hubnutí. Další informace na stránkách jsou zcela nedostatečné. Odborníci, kteří přípravek na stránkách propagují, jsou smyšlení a fotografie staženy z fotobanky. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'xtacticaldrone.xcartpro', 
//  description: 'Stránka, na kterou se dostane spotřebitel nejčastěji přes spam v e-mailu, nabízí údajně drony. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'perfdealpromo', 
//  description: 'Na stránkách se spotřebitel dozví, že "za 28 dní bude váš automobil spalovat o 64 % méně paliva" užíváním neznámého výrobku. Pod tvrzením údajného "centrálního institutu" figuruje prof. Miroslav Vašička, ačkoli tato osoba je smyšlená, nemá ani záznam v žádné seriozní instituci. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'useyourbestbrain', 
//  description: 'Smyšlený příběh má demonstrovat úžasnou úsporu paliva. Stánky pak odkazují na další smyšlený anonymní příběh s tvrzením, že "za 28 dní bude váš automobil spalovat o 64 % méně paliva". Pod tvrzením údajného "centrálního institutu" figuruje prof. Miroslav Vašička, ačkoli tato osoba také neexistuje, ani nemá záznam v žádné seriozní instituci. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'economistguide', 
//  description: 'Stránka na základě smyšleného příběhu má demonstrovat příběh zázračného zbohatnutí pomocí investice do kryptoměn. Prokliky na webu spotřebitele přesměrují na stránky, které lákají poslat peníze do údajného systému, který má na základě investicí do kryptoměny spotřebiteli výhradně vydělat. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'primigishop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'eccopraha', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'relaxenglish', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Na stránkách je nabízeno oblečení. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'ifotbalcz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'finerglory', 
//  description: 'Stránka láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Míří sem spotřebitelé z reklamních lživých e-mailů a stránek, kde má zázračné zbohatnutí slibovat Petr Kellner, jde však o smyšlené údaje a rozhovor, který neexistoval. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'jsjavornik', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Na stránkách je nabízena obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'czech-germixil.beauty-goods', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav prokontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'abm-clinical.webflow', 
//  description: 'Stránky odkazují na neexistující rozhovor s údajným lékařem, tím má být lékař Michal Koláček. Tento domnělý věděc však nemá žádný záznam na univerzitě, ani v jiné seriozní instituci. Fotka je stažena z fotobanky, jde o smyšleného odborníka. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav prokontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kabirshoe', 
//  description: 'Na stránkách je nabízena především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'blockchain', 
//  description: 'Stránky nabízející služby kryptografické peněženky a obchodování s kryptoměnami. Ačkoliv jsou stránky zaměřeny i na českého zákazníka, ne všechny informace jsou v českém jazyce. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní, obchodní podmínky také chybí a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před registrací či zaplacením na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cryptoeddu', 
//  description: 'Jedná o stránky, které nabízí získání kryptoměny zakoupením startovacího balíčku kryptoměny nebo odebíráním kryptoměny prostřednictvím vzdělávacího balíčku (neznámo jakého). Dle obchodních podmínek je prodávajícím / provozovatelem stránek společnost Crypto Education, Reg. No. 165054, New Horizon Buiding, Ground Floor, 3 1/2 Miles Philip S.W. Goldson Higway, Belize City. Ačkoliv jsou stránky zaměření také na české spotřebitele, obchodní podmínky neodpovídají platné právní úpravě.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'blghip', 
//  description: 'Ačkoli se stránky snaží apelovat na spotřebitele, aby odlišili realitu od fikce, tak lákají na léčbu cukrovky. Stránky odkazují na neexistující rozhovor s údajným lékařem, tím má být neurochirurg Mudr. Vitezslav Dvořák. Tento domnělý věděc však nemá žádný záznam na univerzitě, ani v jiné seriozní instituci. Fotka je stažena z fotobanky, jde o smyšleného odborníka. Před nákupem je spotřebitel ještě nucen "zahrát si o slevu" v rámci virtuálního kola, vylosuje si vždy "slevu" 50%. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.gigantnd', 
//  description: 'Stránka, na kterou se dostane spotřebitel nejčastěji přes spam v e-mailu, nabízí neznámý výrobek pro muže. Jako provozovatel je uvedena společnost z Panamy, která figuruje u mnoha jiných rizikových e-shopů, které nabízejí celou řadu dalších neznámých výrobků např. na hubnutí, proti kouření, na prostatu, na klouby, srdeční hypertenzi a další. Recenze jsou smyšlené, pod jinou jazykovou verzí stejných stránek se nacházejí totožné fotky údajně spokojených zákazníků, ale jiná jména. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cpagetti5', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý přípravek na hubnutí. Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajně firma, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Odborníci, kteří přípravek na stránkách propagují, jso smyšlení a fotografie staženy z fotobanky. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cpgtshop2', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt na vysoký krevní tlak. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena společnost z Panamy, která figuruje u mnoha jiných rizikových e-shopů, které nabízejí celou řadu dalších neznámých výrobků např. na hubnutí, proti kouření, na prostatu, na klouby, srdeční hypertenzi a další. Recenze a odborníci jsou smyšlení. Například lékař Ondřej Pumpr, který přípravek na stránkách propaguje, nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ani ve specializovaném ústavu. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pageanket', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před registrací či zaplacením na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pandoraslevy', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'securelywealth', 
//  description: 'Stránka láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Míří sem spotřebitelé z reklamních lživých e-mailů a stránek, kde mají zázračné zbohatnutí slibovat herci a jiné osobnosti, jde však o smyšlené údaje a rozhovory, které neexistovaly. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'worlds-news', 
//  description: 'Stránka láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Míří sem spotřebitelé nejen z reklamních lživých e-mailů, kde zázračné zbohatnutí má slibovat herečka Kate Winslet, jde však o smyšlené údaje a rozhovor, který neexistoval. Stránka zneužívá logo webu CBC News, jedná se však o článek, který na základě smyšleného rozhovoru má demonstrovat příběh zázračného zbohatnutí na základě investice do kryptoměn. Prokliky na webu spotřebitele přesměrují na web securelywealth.net/bitcoinup/lp-en.php, kde jsou lákáni poslat peníze do údajného systému, který má na základě investicí do Bitcoinu spotřebiteli výhradně vydělat. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'profits-bit-apps', 
//  description: 'Stránka láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Míří sem spotřebitelé z reklamních lživých e-mailů a stránek, kde má zázračné zbohatnutí slibovat Petr Kellner, jde však o smyšlené údaje a rozhovor, který neexistoval. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'gigscareer', 
//  description: 'Web, na který se spotřebitelé dostanou proklikem přes reklamní bannery na různých stránkách, píše o rozhovoru v rámci „Interview ČT24“, který však neexistoval. Stránka zneužívá logo webu iPrima.cz, jedná se však o článek, který na základě smyšleného rozhovoru má demonstrovat příběh zázračného zbohatnutí Petra Kellnera na základě investice do kryptoměn. Prokliky na webu spotřebitele přesměrují na stránky profits-bit-apps.com, kde jsou lidé lákáni poslat peníze do údajného systému, který má na základě investicí do Bitcoinu spotřebiteli výhradně peníze rozmnožit. Stránky však mají jinou podobu, pokud spotřebitel přistupuje na web přímo, nebo na základě prokliku. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'privatkunden.pakete-empfangen.alphagrr', 
//  description: 'Jedná se o stránku, které odkazuje na nutnost uhradit za zboží přepravní společností DHL. Avšak nejde o oficiální stránky společnosti DHL, jedná se o zneužití značky a stránky mají vzbudit u spotřebitele důvěru a přímo vyzývají k platbě. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní (zneužívají loga přepravní společnosti DHL) a spotřebitel je vyzýván přes e-mail zde uhradit drobné poplatky, které však DHL oficiálně po spotřebiteli nepožaduje. Plná stránka se však zobrazí jen tomu, komu přijde fiktivní výzva k "úhradě". Před platbou na těchto stránkách Česká obchodní inspekce varuje. Viz obr.: https://www.coi.cz/wp-content/uploads/2020/10/Screenshot_20201015-152710.png', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'ceniusas.alphazgr', 
//  description: 'Jedná se o stránku, které odkazuje na nutnost uhradit za zboží přepravní společností DHL. Avšak nejde o oficiální stránky společnosti DHL, jedná se o zneužití značky a stránky mají vzbudit u spotřebitele důvěru a přímo vyzývají k platbě. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní (zneužívají loga přepravní společnosti DHL) a spotřebitel je vyzýván přes e-mail zde uhradit drobné poplatky, které však DHL oficiálně po spotřebiteli nepožaduje. Před platbou na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'felyapis', 
//  description: 'Stránky odkazují na neexistující rozhovor s údajným lékařem, tím má být neurochirurg Michal Koláček. Tento domnělý věděc však nemá žádný záznam na univerzitě, ani v jiné seriozní instituci. Fotka je stažena z fotobanky, jde o smyšleného odborníka. Před nákupem je spotřebitel ještě nucen "zahrát si o slevu" v rámci virtuálního kola, vylosuje si vždy "slevu" 50%. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'perfectchoice360', 
//  description: 'Stránky odkazují na neexistující rozhovor s údajným vědcem, tím má být Dr. David Karpita. Tento domnělý věděc však nemá žádný záznam na univerzitě, ani v jiné seriozní instituci. Fotka je stažena z fotobanky, jde o smyšleného odborníka. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.magnet4health', 
//  description: 'Stránky odkazují na neexistující rozhovor s údajným vědcem z Českých Budějovic, který vynalezl údajně přírodní metodu odstraňující bolest do 3 minut. Dr. David Karpita, který je zmíněn v článku, nemá žádný záznam na univerzitě, ani v jiné seriozní instituci. Fotka je stažena z fotobanky, jde o smyšleného odborníka. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'migoshop-cz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'freshcantine', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Na stránkách je nabízena obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'technik4less', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'wwlnws', 
//  description: 'Stránky se prezentují jako odborný portál, kde se k neznámému přípravku vyjadřuje údajný Dr. Karl Kirschmayer, který však nemá žádný záznam na univerzitě, ani v jiné seriozní instituci. Fotka je stažena z fotobanky, jde o smyšleného odborníka. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'loftyteam', 
//  description: 'Stránky nabízejí neznámý výrobek na ucpané cévy. Výrobek na stránkách vychvaluje údajný prof. Koláček, který však nemá žádný záznam na univerzitě, ani v jiné seriozní instituci. Fotka je stažena z fotobanky, jde o smysšleného odborníka. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'xtacticaldrone.xfastcart', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'trustableoffering', 
//  description: 'Web, na který jsou spotřebitelé odkazování z webu mirror-news.org/cz/ - zázračné zbohatnutí na webu má slibovat Petr Kellner, jde však o smyšlené údaje a rozhovor v rámci „Interview ČT24“, který neexistoval. Stránka zneužívá logo webu iPrima.cz, jedná se však o článek, který na základě smyšleného rozhovoru má demonstrovat příběh zázračného zbohatnutí Petra Kellnera na základě investice do kryptoměn. Prokliky na webu spotřebitele přesměrují právě na tento web trustableoffering.org, kde jsou lidé lákáni poslat peníze do údajného systému, který má na základě investicí do Bitcoinu spotřebiteli výhradně peníze rozmnožit. Stránky však mají jinou podobu, pokud spotřebitel přistupuje na web přímo, nebo na základě prokliku. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mirror-news', 
//  description: 'Stránka láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Míří sem spotřebitelé nejen z reklamních lživých e-mailů, kde zázračné zbohatnutí má slibovat Petr Kellner, jde však o smyšlené údaje a rozhovor v rámci „Interview ČT24“, který neexistoval. Stránka zneužívá logo webu iPrima.cz, jedná se však o článek, který na základě smyšleného rozhovoru má demonstrovat příběh zázračného zbohatnutí Petra Kellnera na základě investice do kryptoměn. Prokliky na webu spotřebitele přesměrují na web trustableoffering.org, kde jsou lákáni poslat peníze do údajného systému, který má na základě investicí do Bitcoinu spotřebiteli výhradně vydělat. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'potokcpagetti2', 
//  description: 'Nabízený výrobek je doplňkem stravy (jedná se tedy o potravinu). V textech na webových stránkách jsou v souvislosti s doplňkem stravy KETO DIET používána neschválená zdravotní tvrzení o nabízené potravině v rozporu s právními předpisy. Na webových stránkách nejsou uvedeny k tomuto doplňku stravy některé povinné údaje. Jako provozovatel je uvedena společnost z Panamy, která figuruje u mnoha jiných rizikových e-shopů, které nabízejí celou řadu dalších neznámých výrobků např. proti kouření, na prostatu, na klouby, srdeční hypertenzi a další. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'immuten-cz.thegreatfitos', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý produkt proti infekcím. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz-kneebrace.beauty-goods', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt na klouby. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'smartshopping-24', 
//  description: 'Stránka nabízí neznámý výrobek proti křečovým žílám. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bestsupportchannel', 
//  description: 'Stránky se prezentují jako odborný portál, kde se k neznámému přípravku vyjadřuje údajný prof. Stefan Kubíček, který však nemá žádný záznam na univerzitě, ani v jiné seriozní instituci. Fotka je stažena z fotobanky, jde o smyšleného odborníka. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na hubnutí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.vegaslim-shop', 
//  description: 'Stránka, na kterou se dostane spotřebitel nejčastěji proklikem přes web www.abc-pro-zdravi.cz, nabízí neznámý výrobek na hubnutí. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'yoursalearea', 
//  description: 'Stránka, na kterou se dostane spotřebitel nejčastěji proklikem přes web www.abc-pro-zdravi.cz, nabízí neznámý výrobek na problémy s prsty u nohou. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz1.dietspraynd', 
//  description: 'Stránka, na kterou se dostane spotřebitel nejčastěji proklikem přes web www.abc-pro-zdravi.cz, nabízí neznámý výrobek, který se má úživat postřikem do úst, aby člověk zhubl. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'amazingsite24', 
//  description: 'Stránka, na kterou se dostane spotřebitel nejčastěji proklikem přes web www.abc-pro-zdravi.cz, nabízí neznámý výrobek - krém na pokožku. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'stronginfo24', 
//  description: 'Stránka, na kterou se dostane spotřebitel nejčastěji proklikem přes web www.abc-pro-zdravi.cz, nabízí neznámý výrobek pro muže. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'abc-pro-zdravi', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vitahairmax.xfastcart', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý přípravek proti padání vlasů. Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajně firma, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Lékař, který přípravek na stránkách propaguje, je smyšlený a jeho fotografie stažena z fotobanky. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cpagettistream3', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý přípravek na hubnutí. Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajně firma, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Lékař, který přípravek na stránkách propaguje, je smyšlený a jeho fotografie stažena z fotobanky. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'wealthy-offer', 
//  description: 'Stránka láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Míří sem spotřebitelé nejen z reklamních lživých e-mailů, kde zázračné zbohatnutí má slibovat Pavel Nedvěd, jde však o smyšlené údaje a rozhovor, který neexistoval. Stránka zneužívá kryptoměny k nalákání dalších na údajné investice a zázračné zbohatnutí a periodicky obměňuje příběh a mění domény. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: '4mushing', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bytuzitecny', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bikemaraton-bozenov', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mkblansko', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'unitedmob-online', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'thebestvouchers', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může uplatňovat svá práva. E-shop zveřejňuje obchodní podmínky, které hrubě odporují právním předpisům. Po odstoupení od smlouvy nevrací peníze, není kam vrátit zboží. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fotomajak', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Podle informací od spotřebitele po uhrazení za zboží nikdo nekomunikuje, zboží nepřichází. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'brnojih', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Na stránkách je nyní především nabídka bot. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'shopoonline5', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt pro muže. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena společnost z Panamy, která figuruje u mnoha jiných rizikových e-shopů, které nabízejí celou řadu dalších neznámých výrobků např. na hubnutí, proti kouření, na prostatu, na klouby, srdeční hypertenzi a další. Recenze jsou smyšlené. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bepkoenterprises', 
//  description: 'V textu se píše, že český chemik objevil způsob čištění cév a snížení tlaku. Před dvěma týdny získal nejvyšší ocenění země. Celá zpráva je smyšlená, nic takového se nestalo. Webové stránky navigují spotřebitele k nákupu neznáméno přípravku na snížení krevního tlaku. Na stránce je možnost si vylosovat "náhodně" slevu, vždy je na výherném kole vylosována sleva 50 %, která má motivovat k zadání osobních údajů pro objednávku. Jako provozovatel webu není uveden nikdo, stránky uvádějí lživé informace a jsou zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kromerzskavyzva', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá tématu, je tam především nabídka bot. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'drmartenslevne', 
//  description: 'Spotřebitel na těchto anonymních stránkách nakupoval a při požadavku platby předem uhradl 94 USD. Zboží však nepřichází, na e-maily nikdo nereaguje. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'autoskola-pv', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.nicozeron', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt na odvykání kouření. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena společnost z Panamy, která figuruje u mnoha jiných rizikových e-shopů, které nabízejí celou řadu dalších neznámých výrobků např. na hubnutí, proti kouření, na prostatu, na klouby, srdeční hypertenzi a další. Informace na stránkách jsou smyšlené, a to včetně recenzí. Například po zadání těcho stránek, kde místo předpony "cz." bude uvedeno "sk." nebo "pl.", objeví se v recenzích stejné fotky, ale jiná jména a jiný text. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'spojmesilyprosigmu', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hpeprovisioning9', 
//  description: 'Stránky se prezentují uživatelům jako oficiální stránky Google, Facebook nebo Instagram (vždy jedna z variant) a uživatel je informován o výhře v soutěži, avšak jedná se jen o sběr osobních údajů. S těmito stránkami nemá nikdo z provozovatelů (Google, Facebook či Instagram) nic společného. Jde o zneužití a navození falešného pocitu z výhry. Stránky mají zcela jinou podobu po příchodu přímo na domovskou adresu hpeprovisioning9.live a smyslem stránek je zřejmě sběr osobních údajů pro databáze společností využívajících přímý marketing (ať už telefonický, či zasílání spamů e-mailem). Před vyplněním údajů na těchto stránkách Česká obchodní inspekce spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tvoje-krasa', 
//  description: 'Stránky se prezentují jako odborný portál, kde se k neznámemu přípravku vyjadřuje údajný prof. Jan Koloušek, který však nemá žádný záznam na univerzitě, ani v jiné seriozní instituci. Fotka je stažena z fotobanky, jde o smysšleného odborníka. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na hubnutí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'limitedtimeforoffer', 
//  description: 'Na stránky jsou odkazování spotřebitelé ze "zdravotního portálu", který není skutečným portálem zdravotníků. Na webových stránkách je nabízen naprosto neznámý výrobek jako pomoc pacientům proti bolestlem, který není registrovaný u Státního ústavu pro kontrolu léčiv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'currentnewsforyou', 
//  description: 'Stránky se prezentují jako Český zdravotní portál, avšak nejde o žádný oficiální portál skutečných zdravotníků. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek proti bolesti. Stránky jsou úplně stejné, jako jiný obdobný "zdravtní portál", který podobným způsobem nabízí přípravek na klouby i na hubnutí. Fotka údajně spokojených zákazníků je stažena z fotobanky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'keenobuv', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'unifashion', 
//  description: 'V obchodních podmínkách není uvedeno IČO prodejce, podle jména uvedeného v obchodních podmínkách nenalezeno v živnostenském rejstříku. Spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tetarock', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'crocsvyprodej', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'oceanna-hope', 
//  description: 'Stránky se prezentují jako Mezinárodní ústav boje s obezitou, tento ústav však neexistuje. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na hubnutí. Fotka údajně spokojených zákazníků je stažena z fotobanky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.cannajointn', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý konopný přípravek na kloupy. Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajná firma z Panamy, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Lékař, který přípravek na stránkách propaguje, je smyšlený a jeho fotografie stažena z fotobanky. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.amaroklb', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt na problémy s erekcí. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena společnost z Panamy, která figuruje u mnoha jiných rizikových e-shopů, které nabízejí celou řadu dalších neznámých výrobků např. na hubnutí, proti kouření, na prostatu, na klouby, srdeční hypertenzi a další. Recenze a odborníci jsou smyšlení. Například lékař Мichal Verner, který přípravek na stránkách propaguje, nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ani ve specializovaném ústavu. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz3.cannadiab', 
//  description: 'Na webových stránkách je nabízen naprosto neznámý výrobek jako pomoc pacientům při cukrovce, který není registrovaný u Státního ústavu pro kontrolu léčiv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mycpagettipotok1', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt na vysoký krevní tlak. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena společnost z Panamy, která figuruje u mnoha jiných rizikových e-shopů, které nabízejí celou řadu dalších neznámých výrobků např. na hubnutí, proti kouření, na prostatu, na klouby, srdeční hypertenzi a další. Recenze a odborníci jsou smyšlení. Například lékař Ondřej Pumpr, který přípravek na stránkách propaguje, nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ani ve specializovaném ústavu. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cs-new.prolesan-pure', 
//  description: 'Stránky se prezentují jako Český lékařský portál, avšak nejde o žádný oficiální portál skutečných lékařů. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na hubnutí. Stránky jsou úplně stejné, jako jiný obdobný "lékařský portál", který podobným způsobem nabízí přípravek na klouby. Fotka údajně spokojených zákazníků je stažena z fotobanky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'laskavalimetka', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'eirlz', 
//  description: 'Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'uzemneni', 
//  description: 'Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'guccisk', 
//  description: 'Na webu je nabízeno oblečení a obuv. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'snoreblock', 
//  description: 'Na webu je nabízena obuv. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zemanznovu', 
//  description: 'Doména po expiraci, kterou někdo využívá k vystavení zboží, nejčastěji bot. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cpagettistream8', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý přípravek na hubnutí. Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajně firma, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Lékař, který přípravek na stránkách propaguje, je smyšlený a jeho fotografie stažena z fotobanky. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mojeroto', 
//  description: 'Jedná se o internetový obchod nabízející dámské a pánské oblečení, obuv a doplňky, kde není žádným způsobem identifikován prodávající. Chybí zde řádné obchodní podmínky, spotřebiteli je určeno pouze minimum informací, přičemž je zřejmé, že se jedná o strojový překlad do českého jazyka. Lustrací v registru domén byl jako držitel domény zjištěn zahraniční subjekt s adresou v Číně.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'czechshop', 
//  description: 'Nabízený výrobek je doplňkem stravy (jedná se tedy o potravinu). V textech na webových stránkách jsou v souvislosti s doplňkem stravy KETO DIET používána neschválená zdravotní tvrzení o nabízené potravině v rozporu s právními předpisy. Na webových stránkách nejsou uvedeny k tomuto doplňku stravy některé povinné údaje. Na webových stránkách je uveden kontakt: Údolní 11, 602 00 Brno-střed, Czech Republic. Na zmiňované adrese však nebyla zjištěna žádná provozovna, která by souvisela s těmito webovými stránkami. Před internetovým obchodem varuje Státní zemědělská a potravinářská inspekce a také Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mydiabeticsolutions', 
//  description: 'Stránky zneužívají státní symbol a prezentují se jako oficiální stránky Ministerstva zdravotnictví ČR, ačkoli tomu tak není. Na webových stránkách je nabízen naprosto neznámý výrobek jako pomoc pacientům při cukrovce, který není registrovaný u Státního ústavu pro kontrolu léčiv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav pro kontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'dialinebest.remedythebest', 
//  description: 'Nabízený výrobek vzbuzuje dojem, že je léčivým přípravkem. Ve skutečnosti se jedná o doplněk stravy (tedy o potravinu). V textech na webových stránkách jsou v souvislosti s doplňkem stravy Dialine používána tzv. léčebná tvrzení o nabízené potravině v rozporu s právními předpisy. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz-eretron-aktiv.urban-deals', 
//  description: 'Na webových stránkách je nabízen naprosto neznámý výrobek jako pomoc mužům při potížích s erekcí, výrobek se má užívat. Jako prodejce je uvedena firma z Barcelony, která se objevuje u celé řady rizikových e-shopů, viz níže. Spotřebitel je na tyto stránky odkazován ve spamech, které se šíří elektronickou poštou. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'austarucetnictvi', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'sleva.stores2020', 
//  description: 'Na webu je nabízena obuv. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'guccieshop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Vyžadována je platba předem kartou, peníze odcházejí v čínských juanech. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'svethadu', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'annapolackova', 
//  description: 'Po uhrazení objednaného zboží platbou předem podle spotřebitelských informací nic nedorazí. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Jediná cesta, jak kontaktovat prodejce, je formulář na webu, na ten však podle spotřebitelských podání nikdo nereaguje. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'rigthoffer24', 
//  description: 'Na webových stránkách je nabízen naprosto neznámý výrobek jako pomoc proti stárnutí a bolestem kloubů. Spotřebitel je na tyto stránky odkazován ve spamech, které se šíří elektronickou poštou. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'worldtriviacenter', 
//  description: 'Webové stránky vypadají jako jakýsi oficiální zdravotní portál, avšak nejde o žádný zdravotní portál. Na stránkách je pak nabízen pochybný výrobek s téměř zázračnými vlastnostmi proti bolestem a stárnutí. Fotka údajně spokojených zákazníků je stažena z fotobanky. Jakmile chcete opustit stránku, vyskočí "varování" a "ještě lepší" nabídka, která nutí spotřebitele k nákupu. Jakmile zadáte stránku worldtriviacenter.com napřímo, zobrazí sejako neexistující. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz2.cardimnd', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji přes reklamu, slibují neznámý přípravek proti srdeční hypertenzi. Lákají tlačítkem "začněte léčbu ihned". Informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena údajně firma z Panamy, která figuruje u mnoha jiných rizikových e-shopů, které nabízejí celou řadu dalších neznámých výrobků např. na hubnutí, proti kouření, prostatě, na klouby, srdeční hypertenzi a další. Výrobky nejsou schváleny Ústavem pro kontrolu léčiv, lékaři před těmito neznámými přípravky varují. Nákup zde za rizikový považuje také Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'suricateeyes', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'attest', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lekarnanaproudu', 
//  description: 'Stránky údajné lékárny s volným prodejem přípravků a léků, některé jsou výhradně na lékařský předpis. Stránky jsou anonymní. Provozovatel webu nesplňuje zákonné podmínky pro provoz lékárny. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav pro kontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz-cardio-nrj.beauty-shopping', 
//  description: 'Na webových stránkách je nabízen naprosto neznámý výrobek jako pomoc pacientům proti infarktu. Spotřebitel je na tyto stránky odkazován ve spamech, které se šíří elektronickou poštou. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav pro kontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cloudcheats', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vialeky', 
//  description: 'Internetové stránky nabízejí přípravky určené výhradně pro prodej v lékárnách. Uvedená stránka, ačkoli se jako lékárna prezentuje, lékarnou není. Obchodní podmínky jsou jen nesmyslný text, který nemá náležitosti obchodních podmínek. Česká obchodní inspekce na základě informací Státního ústavu pro kontrolu léčiv před těmito stránkami varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'valicellicz', 
//  description: 'Stránky zneužívají státní symbol a prezentují se jako oficiální stránky Ministerstva zdravotnictví ČR, ačkoli tomu tak není. Na webových stránkách je nabízen naprosto neznámý výrobek jako pomoc pacientům při cukrovce, který není registrovaný u Státního ústavu pro kontrolu léčiv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav pro kontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lmbnzwbu.greatsnarods', 
//  description: 'Na webových stránkách je nabízen naprosto neznámý výrobek jako pomoc pacientům při cukrovce, který není registrovaný u Státního ústavu pro kontrolu léčiv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav pro kontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'suga-product', 
//  description: 'Na webových stránkách je nabízen naprosto neznámý výrobek jako pomoc pacientům při cukrovce, který není registrovaný u Státního ústavu pro kontrolu léčiv. Jako prodejce je uvedena firma z Panamy, která se objevuje u celé řady rizikových e-shopů, viz níže. Spotřebitel je na tyto stránky odkazován ve spamech, které se šíří elektronickou poštou. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'flexaplus-24', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav pro kontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vitaminnatural', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách varuje Česká obchodní inspekce i Státní ústav pro kontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vigor-book', 
//  description: 'Internetové stránky slibují například přípravek Levasan Maxx, před kterým varuje i Státní ústav pro kontrolu léčiv. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, vůči komu může nárokovat svá práva. Česká obchodní inspekce na základě informací Státního ústavu pro kontrolu léčiv před těmito stránkami varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz1.alkozerond', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý přípravek na boj proti závislosti na alkoholu. Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajná firma z Panamy, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Lékař, údajně jménem Štěpán Kožešník, který přípravek na stránkách propaguje, nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ani ve specializovaném ústavu. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'keenvyprodej', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pandora-akce', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Vyžadována je platba předem kartou, peníze odcházejí v čínských juanech. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zirovnice', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'a-cz-bright-skin.natural-sales', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, nabízejí téměř zázračný výrobek na pleť. Obchodní podmínky v češtině zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena údajně firma, která figuruje u mnoha jiných rizikových e-shopů. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'btcsystemsoftapp', 
//  description: 'Stránka láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Míří sem spotřebitelé nejen z reklamních lživých e-mailů, kde zázračné zbohatnutí má slibovat Leoš Mareš, jde však o smyšlené údaje a rozhovor, který neexistoval. Stránka zneužívá kryptoměny k nalákání dalších na údajné investice a zázračné zbohatnutí a periodicky obměňuje příběh a mění domény. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'btc-czech', 
//  description: 'Stránka se otevře teprve po rozkliknutí reklamy, viz obrázek reklamy (https://www.coi.cz/btc-czech-com/). Mareš se skutečně vyjadřoval v České televizi, tento záběr a zmínka v Událostech ČT ale byla kvůli tomu, že známý moderátor reagoval na to, aby lidé nosili roušky. Po prokliku se však zobrazí lživý text a smyšlený rozhovor s Danielem Takáčem o úžasné šanci zbohatnout. Stránka pak láká spotřebitele zadat údaje na anonymním webu btcsystemsoftapp.com a investovat do zázračného zbohatnutí v kryptoměnách. Před těmito stránkami ČOI varuje, web je anonymní a údajně zaručené zbohatnutí se opírá o zkreslená fakta.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz2.wowbustlb', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý přípravek na zvětšení prsou. Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajná firma z Panamy, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Lékařka, údajně jménem Doufková Anet, která přípravek na stránkách propaguje, nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ani ve specializovaném ústavu. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'rickerfriends', 
//  description: 'Stránka láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Míří sem spotřebitelé nejen z reklamních lživých e-mailů, kde zázračné zbohatnutí má slibovat Radovan Vítek, jde však o smyšlené údaje a rozhovor, který neexistoval. Stránka zneužívá kryptoměny k nalákání dalších na údajné investice a zázračné zbohatnutí a periodicky obměňuje příběh a mění domény. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'yummy-yump', 
//  description: 'Stránky mají dvě různé podoby, avšak ani jedna není v pořádku. Obě verze jsou pro spotřebitele anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Pokud například přijdete přes reklamu, prezentují se dokonce jako Český zdravotní portál, viz https://www.coi.cz/halux/. Avšak nejedná se o žádný oficiální zdravotní portál. Na stránkách je pak nabízen pochybný a hlavně neznámý výrobek. Fotka uvedená na stránkách, kde je zveřejněn údajný odborník, který údajně obdržel Nobelovu cenu, tedy prof. Radovan Rucký, je stažena z fotobanky. Dále je nutno dodat, že údajný prof. Radovan Rucký nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu, ani nedostal Nobelovu cenu. Fotka údajně spokojených zákazníků je také stažena z fotobanky. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'waxx', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'youreduspace', 
//  description: 'Stránky se prezentují jako oficiální lingvistickýportál, avšak nejde o žádný oficiální portál skutečných lingvistů. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na rychlou výuku jazyků. Fotka uvedená na stránkách, kde je zveřejněn údajný odborník, který údajně obdržel nominaci na Nobelovu cenu je stažena z fotobanky. Dále je nutno dodat, že tento údajný odborník nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu, ani není kandidátem na Nobelovu cenu. Fotka údajně spokojených zákazníků je také stažena z fotobanky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.cannajointnd', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý konopný přípravek na kloupy. Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajná firma z Panamy, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Lékař, který přípravek na stránkách propaguje, je smyšlený a jeho fotografie stažena z fotobanky. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bestbtcoffers', 
//  description: 'Stránka láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Míří sem spotřebitelé nejen z reklamních lživých e-mailů, kde zázračné zbohatnutí má slibovat Pavel Nedvěd, jde však o smyšlené údaje a rozhovor, který neexistoval. Stránka zneužívá kryptoměny k nalákání dalších na údajné investice a zázračné zbohatnutí a periodicky obměňuje příběh a mění domény. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz-eretron-aktiv.greatest-shop', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý přípravek na rychlou erekci. Obchodní podmínky v češtině zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena údajně firma, která figuruje u mnoha jiných rizikových e-shopů. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'sleva.outletonline2020', 
//  description: 'Jedná se o obdobu e-shopu sleva.outletsale2020.com, který je zveřejněn v našem seznamu rizikových e-shopů již několik dní. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bitcoinsystemwebapp', 
//  description: 'Stránka láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Míří sem spotřebitelé nejen z reklamních lživých e-mailů, kde zázračné zbohatnutí má slibovat Pavel Nedvěd, jde však o smyšlené údaje a rozhovor, který neexistoval. Stránka zneužívá kryptoměny k nalákání dalších na údajné investice a zázračné zbohatnutí a periodicky obměňuje příběh a mění domény. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'getfityourbody', 
//  description: 'Stránky se prezentují jako oficiální lékařský portál, avšak nejde o žádný oficiální portál skutečných lékařů. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na klouby. Fotka uvedená na stránkách, kde je zveřejněn údajný odborník, který údajně obdržel Nobelovu cenu, tedy prof. Radovan Rucký, je stažena z fotobanky. Dále je nutno dodat, že údajný prof. Radovan Rucký nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu, ani nedostal Nobelovu cenu. Fotka údajně spokojených zákazníků je také stažena z fotobanky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'levasan-maxx2', 
//  description: 'Internetové stránky slibují například přípravek Levasan Maxx, před kterým varuje i Státní ústav pro kontrolu léčiv. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, vůči komu může nárokovat svá práva. Česká obchodní inspekce na základě informací Státního ústavu pro kontrolu léčiv před těmito stránkami varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'b92eegumoc', 
//  description: 'Na tuto adresu odkazují spamy. Následuje přesměrování na další různé anonymní weby, které především sbírají osobní údaje. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, vůči komu může nárokovat svá práva. Před těmito stránkami Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vova', 
//  description: 'Internetový obchod je provozován subjektem se sídlem mimo členské státy Evropské unie, ačkoliv internetový obchod může u spotřebitelů vzbuzovat dojem, že je provozován subjektem se sídlem v České republice nebo Evropské unii. Spotřebitelé nemohou uplatňovat svá práva, nebo je tato možnost významně ztížena. Stížnosti spotřebitelů ČOi obdržela ve smyslu vadného zboží, neumožnění odstoupit od smlouvy. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'akalendare', 
//  description: 'E-shop nezveřejňuje obchodní podmínky, zbytek textu připomínající obchodní podmínky hrubě odporuje právním předpisům. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'webshoppingnets', 
//  description: 'Webové stránky mají dvě různé podoby. Přistoupit na stránky přímo znamená, že se uživateli nezobrazí nic. Příchodem přes reklamu se vytvoří speciální proklik (viz uvedený odkaz) a na stránkách je nabízen anonymní výrobek pro děti. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'meussalus', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zlamaniny', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'nimstore', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'voscb', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vocalpast', 
//  description: 'Webové stránky mají dvě různé podoby. Pokud přijdete z reklamy, pak vypadají stránky takto: https://www.coi.cz/vocalpast/ a web se prezentuje jako jakýsi oficiální zdravotní portál, avšak nejde o žádný oficiální zdravotní portál. Na stránkách je pak nabízen pochybný výrobek s téměř zázračnými vlastnostmi. Fotka údajně spokojených zákazníků je stažena z fotobanky. Jakmile chcete opustit stránku, vyskočí "varování" a "ještě lepší" nabídka, která nutí spotřebitele k nákupu. Jakmile zadáte stránku vocalpast.com napřímo, zobrazí se jiná verze stránek než ta po prokliku z reklamy. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.coolboxshop', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'sleva.outletsale2020', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'regall', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fashionlu', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fotoobrazy-job', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'denisablahova', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'chonkyplushies', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'comclone', 
//  description: 'Na uvedených stránkých lékař Vilém Rohn z Fakultní nemocnice v Motole v údajném rozhovoru popisuje účinky neznámého léku, který má řešit problémy s krevním tlakem. Součástí je i prodej propagovaného údajně až zázračného léku. Za lék se zaručuje v článku i FN Motol. Jedná se však o článek, který je vymyšlený - nemocnice i lékař se od něj distancují. Česká obchodní inspekce před těmito stránkami také varuje nejen z výše uvedených důvodů. Více zde: https://www.idnes.cz/zpravy/domaci/nemocnice-motol-vilem-rohna-zazracny-lek-je-podvod.A200611_114237_domaci_wass', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.eenergylb', 
//  description: 'Stránky odkazují formou článku na prodej zařízení na šetření spotřeby elektrické energie. Toto zařízení však energii nemůže ušetřit, ale naopak ji spotřebovává. Může se navíc jednat o nebezpečný výrobek. V roce 2012 byl do systému RAPEX nahlášen velmi podobný výrobek Power Factor Saver, výrobek představoval nebezpečí úrazu elektrickým proudem, protože napětí na kolících po odpojení výrobku ze zásuvky bylo příliš vysoké. Internetové stránky jsou provozovány zahraničními osobami, které figurují u jiných rizikových webů, sídlo uvádějí v Panamě. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.cannaprostnd', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý konopný přípravek proti prostatě. Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajně firma, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Lékař, který přípravek na stránkách propaguje, je smyšlený a jeho fotografie stažena z fotobanky. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'smartall', 
//  description: 'Na základě podání spotřebitelů zahájila Česká obchodní inspekce kontrolu v rámci svých dozorových pravomocí. Podnikatelský subjekt dle zaslaných podnětů od spotřebitelů neakceptuje odstoupení od kupní smlouvy, finanční částky za nedodané výrobky nevrací. Dle informací uvedených v podání je nekontaktní, nereaguje na e-maily. Na základě postoupení živnostenskému úřadu v Českém Těšíně bylo tímto zjištěno, že na stránkách uvedená fyzická osoba žádnou podnikatelskou činnost neprovozuje a jedná se o zneužití jména fyzické osoby. Uvedené zjištění bylo sděleno Policii ČR i stěžovatelům. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'inuivet', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.nicozerond', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt na odvykání kouření. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena společnost z Panamy, která figuruje u mnoha jiných rizikových e-shopů, které nabízejí celou řadu dalších neznámých výrobků např. na hubnutí, proti kouření, na prostatu, na klouby, srdeční hypertenzi a další. Informace na stránkách jsou smyšlené, a to včetně recenzí. Například po zadání těcho stránek, kde místo předpony "cz." bude uvedeno "sk." nebo "pl.", objeví se v recenzích stejné fotky, ale jiná jména a jiný text. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'boostwot', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před zaplacením na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tvarlitomysl', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'veterinamnichovice', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lenkajuricova', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'ijinak', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vansobchod', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'studuj-burzu', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'coolkick', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'depilace-kosmetika-brno', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bistrou2pratel', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím jsou především hračky. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'm-fitnessclub', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'andreasmidova', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vsevakci', 
//  description: 'Česká obchodní inspekce registruje vysoký počet stížností, které se internetových stránek týkají. Podle informací uvedených na internetových stránkách se má u části zboží jednat o zprostředkování nákupu od údajného externího prodávajícího z Číny. Identita tohoto údajného zahraničního prodávajícího však není spotřebiteli transparentně sdělena. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem u dodavatele“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců, pokud vůbec. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost případného externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.insumednd', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt na vysoký krevní tlak. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena společnost z Panamy, která figuruje u mnoha jiných rizikových e-shopů, které nabízejí celou řadu dalších neznámých výrobků např. na hubnutí, proti kouření, na prostatu, na klouby, srdeční hypertenzi a další. Recenze a odborníci jsou smyšlení. Například vedoucí specialista Kroupa Dušan v jiné verzi stránek (sk.insumednd.com) má jméno Miroslav Gorodský, avšak fotografie je totožná. Informace na stránkách jsou smyšlené, a to včetně recenzí. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kadernictvieso', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.feizeripx', 
//  description: 'Obsah obchodních podmínek hrubě odporuje právním předpisům. Web je anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tompolprojekt', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'naplnkbelik', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bitcoinsystemwebsoft', 
//  description: 'Stránka láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Míří sem spotřebitelé nejen z reklamních lživých e-mailů, kde zázračné zbohatnutí má slibovat Leoš Mareš, jde však o smyšlené údaje a rozhovor, který neexistoval. Stránka zneužívá kryptoměny k nalákání dalších na údajné investice a zázračné zbohatnutí a periodicky obměňuje příběh a mění domény. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'btc-financer', 
//  description: 'Stránka se otevře teprve po rozkliknutí reklamy, viz obrázek reklamy (https://www.coi.cz/wp-content/uploads/2020/03/reklama-mares.png). Mareš se skutečně vyjadřoval v České televizi, tento záběr a zmínka v Událostech ČT ale byla kvůli tomu, že známý moderátor reagoval na to, aby lidé nosili roušky. Po prokliku se však zobrazí lživý text a smyšlený rozhovor s Danielem Takáčem o úžasné šanci zbohatnout. Stránka pak láká spotřebitele zadat údaje na anonymním webu bitcoinsystemwebsoft.com a investovat do zázračného zbohatnutí v kryptoměnách. Před těmito stránkami ČOI varuje, web je anonymní a údajně zaručené zbohatnutí se opírá o zkreslená fakta.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.parazitolnd', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt proti parazitům. Obchodní podmínky zcela chybí. Spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bezpupku', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.cannahypernd', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt na vysoký krevní tlak. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena společnost z Panamy. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'perfektnisaty', 
//  description: 'ČOI eviduje vyšší počet stížností na tento e-shop, kdy prodávající místo objednaného zboží zasílá úplně jiné, na odstoupení od smlouvy vůbec nereaguje. Jako provozovatel webu není uveden nikdo, v obchodních podmínkách je pouze uvedeno neexistující IČO, web je tedy anonymní, spotřebitel neví, s kým uzavírá kupní smlouvu.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'buyitnowcz.variconis-original', 
//  description: 'Na webových stránkách je nabízen naprosto neznámý výrobek jako pomoc lidem s křečovými žílami. Výrobek zcela neznámý. Na stránkách navíc probíhá odpočítávání času jako nátlak na spotřebitele, po znovunačtení stránek běží časomíra znovu. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zilnimedci', 
//  description: 'Na webových stránkách je nabízen naprosto neznámý výrobek jako pomoc lidem s křečovými žílami. Výrobek zcela neznámý. Na stránkách navíc probíhá odpočítávání času jako nátlak na spotřebitele, po znovunačtení stránek běží časomíra znovu. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lipox', 
//  description: 'Jako provozovatel webu je uvedena v obchodních podmínkách firma TNA Technology s.r.o., IČO: 0812276 (viz obr: https://www.coi.cz/wp-content/uploads/2020/05/lipox.png), avšak taková firma neexistuje. Spotřebitel tedy neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tatincidetem', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především elektronika. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.cannabisoilnd', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt na bolesti kloubů. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena společnost z Panamy. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'darinahradska', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'oss10plus.getitwhileitsthot', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: '24gid', 
//  description: 'Na stránkách text spotřebitele vyděsí tím, že jim mohou paraziti sžírat tělo. Fotka uvedená na stránkách, kde je zveřejněna údajná odbornice, tedy Dr. Lydie Kovaříková, je stažena z fotobanky. Dr. Lydie Kovaříková nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu. Fotka údajně spokojených zákazníků je také stažena z fotobanky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz4.ketodietnd', 
//  description: 'Na základě smyšlených informací prezentován neznámý přípravek na zhubnutí. Dole je pak jakési kolo štěstí - spotřebitel si pokaždé "vylosuje" slevu 50% a poté má omezený čas k vyplnění objednávkového formuláře. Na stránkách je příběh ženy, která měla údajně zhubnout. Přípěh je smyšlený, stejně jako loterie na stránkách, kde zatočením kola si spotřebitel vždy vylosuje údajnou slevu 50%. Nákup zde za rizikový považuje Česká obchodní inspekce, stránky jsou anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'estersafranek', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bestbuyczech.myshopify', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'eu.insidemarketdataevents', 
//  description: 'Varování před těmito stránkami obdržela Česká obchodní inspekce od společnosti Seznam.cz, kdy se zobrazila reklama s automatickým přesměrováním na stránku, která se tváří jako poskytovatel internetového připojení uživatele. Jde o podvodnou stránku, před kterou ČOI i Seznam.cz varují.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lifemymall', 
//  description: 'Internetový obchod je provozován subjektem se sídlem mimo členské státy Evropské unie, ačkoliv internetový obchod může u spotřebitelů vzbuzovat dojem, že je provozován subjektem se sídlem v České republice nebo Evropské unii, např. e-shop v českém jazyce je provozován subjektem se sídlem v Číně. Spotřebitelé nemohou uplatňovat svá práva, nebo je tato možnost významně ztížena. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'koronavirus', 
//  description: 'Stránky jsou některé dny zcela nedostupné. V okamžiku, kdy dostupné jsou, jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'probaterie', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může uplatňovat svá práva. E-shop nezveřejňuje obchodní podmínky, stránka připomínající obchodní podmínky hrubě odporuje právním předpisům. Internetový obchod je provozován subjektem se sídlem mimo členské státy Evropské unie, ačkoliv internetový obchod může u spotřebitelů vzbuzovat dojem, že je provozován subjektem se sídlem v České republice nebo Evropské unii, např. e-shop v českém jazyce je provozován subjektem se sídlem v Číně. Spotřebitelé nemohou uplatňovat svá práva, nebo je tato možnost významně ztížena.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'faux', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kafar', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'radcesdkarty', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především hračky. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'technet4u', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'salecz.fungonis-original', 
//  description: 'Internetové stránky slibují produkt Fungonis, který je již uveřejněný na stránkách SÚKL od 26.4.2019, případ úřad prošetřoval. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena společnost z Panamy. Před nákupem na těchto stránkách varuje Česká obchodní inspekce a Státní ústavpro kontrolu léčiv.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'audi-sport', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.cleanvisionnd', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt, který vám údajně vrátí zrak. Tento výrobek je zcela neznámý, má mít však až zázračné účinky. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena společnost z Panamy. Na stránkách probíhá odpočítávání času, po který uvedená nabídka platí, avšak časomíra se vrací zpět, jde o nekalou obchodní praktiku a nátlak na spotřebitele, aby nakoupil a neměl čas o nabídce přemýšlet. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'eccooutlet', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz6.immunity.canabis-oil', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji přes reklamu, slibují neznámý přípravek proti virům. Informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena údajně firma z Panamy, která figuruje u mnoha jiných rizikových e-shopů, které nabízejí celou řadu dalších neznámých výrobků např. na hubnutí, proti kouření, na prostatu, na klouby, srdeční hypertenzi a další. Nákup zde za rizikový považuje také Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bitcoinsystemweb', 
//  description: 'Stránka láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Míří sem spotřebitelé nejen z reklamních lživých e-mailů, kde zázračné zbohatnutí má slibovat Pavel Nedvěd, jde však o smyšlené údaje a rozhovor, který neexistoval. Stránka zneužívá kryptoměny k nalákání dalších na údajné investice a zázračné zbohatnutí a periodicky obměňuje příběh a mění domény. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'europe2bitcoin', 
//  description: 'Stránka se otevře teprve po rozkliknutí reklamy nebo příchodem z podvodného e-mailu se smyšlenými informacemi o zázračném zbohatnutí fotbalisty Pavla Nedvěda, viz obrázek (www.coi.cz/nedved/). Po prokliku se však zobrazí lživý text a smyšlený rozhovor Pavla Nedvěda s Danielem Takáčem o úžasné šanci zbohatnout. Stránka pak láká spotřebitele zadat údaje na anonymním webu bitcoinsystemweb.com a investovat do zázračného zbohatnutí v kryptoměnách. Před těmito stránkami ČOI varuje, web je anonymní a údajně zaručené zbohatnutí se opírá o lživá a zkreslená fakta.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'prodazhatovara', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji přes reklamu, slibují neznámý přípravek proti chlupům na těle. Informace na stránkách jsou nedostatečné. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz2.cardimednd', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji přes reklamu, slibují neznámý přípravek proti srdeční hypertenzi. Lákají tlačítkem "začněte léčbu ihned". Informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena údajně firma z Panamy, která figuruje u mnoha jiných rizikových e-shopů, které nabízejí celou řadu dalších neznámých výrobků např. na hubnutí, proti kouření, prostatě, na klouby, srdeční hypertenzi a další. Výrobky nejsou schváleny Ústavem pro kontrolu léčiv, lékaři před těmito neznámými přípravky varují. Nákup zde za rizikový považuje také Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'underarmourprodej', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'boxerkyprotebe', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.adamourlb', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý přípravek na rychlou erekci. Obchodní podmínky v češtině zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena údajně firma z Panamy, která figuruje u mnoha jiných rizikových e-shopů. Na stránkách odbíhá odpočítávání času i kusů, které zbývají, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Při aktualizaci stránky však zbývající kusy zase přibudou, jde o klamání spotřebitele. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'amorise', 
//  description: 'Stránka se otevře teprve po rozkliknutí reklamy na Facebooku, viz obrázek reklamy (https://www.coi.cz/wp-content/uploads/2020/03/reklama-mares.png). Mareš se skutečně vyjadřoval v České televizi, tento záběr a zmínka v Událostech ČT ale byla kvůli tomu, že známý moderátor reagoval na to, aby lidé nosili roušky. Po prokliku se však zobrazí lživý text a smyšlený rozhovor s Danielem Takáčem o úžasné šanci zbohatnout, viz obrázek (https://www.coi.cz/wp-content/uploads/2020/04/amorise.png). Stránka pak láká spotřebitele zadat údaje na anonymním webu seekmob.com a investovat do zázračného zbohatnutí v kryptoměnách. Před těmito stránkami ČOI varuje, web je anonymní a údajně zaručené zbohatnutí se opírá o zkreslená fakta.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'obchod2017', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz-novinky', 
//  description: 'Stránka zneužívá logo portálu Novinky.cz a láká na telefony zadarmo. Ve skutečnosti jde o podvodnou stránku, která zneužívá logo a grafický vzhled serveru Novinky.cz, provozovatel portálu na to ČOI upozornil. Více o tom v článku zde: https://www.novinky.cz/internet-a-pc/bezpecnost/clanek/zadarmo-telefony-nikdo-nerozdava-jak-se-nenechat-napalit-40317869. Úvodní stránka je však přesměrovaná, podvodná stránka se zobrazí jen příchodem z reklamy. Stránka se snaží vyvolat ve spotřebiteli dojem, že se jedná o oficiální článek serveru Novinky.cz, před tímto webem a vyplněním údajů k údajnému získání mobilu zdarma Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'consumermathiepgoals', 
//  description: 'Stránka zneužívá logo portálu Novinky.cz a láká na telefony zadarmo. Ve skutečnosti jde o podvodnou stránku, která zneužívá logo a grafický vzhled serveru Novinky.cz, provozovatel portálu na to ČOI upozornil. Více o tom v článku zde: https://www.novinky.cz/internet-a-pc/bezpecnost/clanek/zadarmo-telefony-nikdo-nerozdava-jak-se-nenechat-napalit-40317869. Úvodní stránka je však přesměrovaná, podvodná stránka se zobrazí jen příchodem z reklamy. Stránka se snaží vyvolat ve spotřebiteli dojem, že se jedná o oficiální článek serveru Novinky.cz, před tímto webem a vyplněním údajů k údajnému získání mobilu zdarma Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'consumermarketdefinition', 
//  description: 'Stránka zneužívá logo portálu Novinky.cz a láká na telefony zadarmo. Ve skutečnosti jde o podvodnou stránku, která zneužívá logo a grafický vzhled serveru Novinky.cz, provozovatel portálu na to ČOI upozornil. Více o tom v článku zde: https://www.novinky.cz/internet-a-pc/bezpecnost/clanek/zadarmo-telefony-nikdo-nerozdava-jak-se-nenechat-napalit-40317869. Úvodní stránka je však přesměrovaná, podvodná stránka se zobrazí jen příchodem z reklamy. Stránka se snaží vyvolat ve spotřebiteli dojem, že se jedná o oficiální článek serveru Novinky.cz, před tímto webem a vyplněním údajů k údajnému získání mobilu zdarma Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'novinkucz', 
//  description: 'Stránka zneužívá logo portálu Novinky.cz a láká na telefony zadarmo. Ve skutečnosti jde o podvodnou stránku, která zneužívá logo a grafický vzhled serveru Novinky.cz, provozovatel portálu na to ČOI upozornil. Více o tom v článku zde: https://www.novinky.cz/internet-a-pc/bezpecnost/clanek/zadarmo-telefony-nikdo-nerozdava-jak-se-nenechat-napalit-40317869. Úvodní stránka je však přesměrovaná, podvodná stránka se zobrazí jen příchodem z reklamy či například po uvedení této dlouhé URL adresy v prohlížeči: https://novinkucz.site/5hYZcFs3?utm_creative=CZ06%20%E2%80%94%20%D0%9A%D0%BE%D0%BF%D0%B8%D1%8F&utm_campaign=CZ06&utm_source=fb&utm_placement=Facebook_Mobile_Feed&adset_id=23844560294640053&adset_name=CZ%20-%2026-57&ad_id=23844560296110053&fbclid=IwAR02jWVuDKrsp48SIyU6i-lNxhHXuk0kYSZKgdn_hv-O5Hsi4kdNO8tosW0', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'novinky-cz', 
//  description: 'Stránka zneužívá logo portálu Novinky.cz a láká na telefony zadarmo. Ve skutečnosti jde o podvodnou stránku, která zneužívá logo a grafický vzhled serveru Novinky.cz, provozovatel portálu na to ČOI upozornil. Více o tom v článku zde: https://www.novinky.cz/internet-a-pc/bezpecnost/clanek/zadarmo-telefony-nikdo-nerozdava-jak-se-nenechat-napalit-40317869. Úvodní stránka je však přesměrovaná, podvodná stránka se zobrazí jen příchodem z reklamy či například po uvedení této dlouhé URL adresy v prohlížeči: http://novinky-cz.xyz/qRWNpGpY?utm_creative=Default+name+-+%D0%9A%D0%BE%D0%BD%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B8&utm_campaign=Czech&utm_source=fb&utm_placement=Facebook_Marketplace&adset_id=23844437549200463&adset_name=CZ+-+24-54+%E2%80%94+%D0%9A%D0%BE%D0%BF%D0%B8%D1%8F&ad_id=23844437549190463&fbclid=IwAR1UIgBZRACGYxQ80OKyLDsXFgDaHxbUKR4FnC3CcAa4ELVvqf_-zCuFC5A', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zozu', 
//  description: 'Dle registrace i obchodních podmínek a fungování stránek se jedná o další mutaci e-shopu stejného provozovatele (ROPETA LTD, identifikační číslo (CRN): 11761407, se sídlem Enterprise House 2 Pass Street, Oldham, Manchester, United Kingdom, OL9 6HZ), který má weby vevio.cz a huglo.cz, před nimi však varuje ČOI již delší dobu. Důvod stejný, tedy z webových stránek není jednoznačně zřejmé, kdo je prodávajícím, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může uplatňovat svá práva. Česká obchodní inspekce registruje vysoký počet stížností, které se těchto různých portálů stejného provozovatele týkají. Z uvedených důvodů zařazuje Česká obchodní inspekce i tuto verzi stránek stejného provozovatele mezi rizikové weby.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zozu', 
//  description: 'Dle registrace i obchodních podmínek a fungování stránek se jedná o další mutaci e-shopu stejného provozovatele (ROPETA LTD, identifikační číslo (CRN): 11761407, se sídlem Enterprise House 2 Pass Street, Oldham, Manchester, United Kingdom, OL9 6HZ), který má weby vevio.cz a huglo.cz, před nimi však varuje ČOI již delší dobu. Důvod stejný, tedy z webových stránek není jednoznačně zřejmé, kdo je prodávajícím, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může uplatňovat svá práva. Česká obchodní inspekce registruje vysoký počet stížností, které se těchto různých portálů stejného provozovatele týkají. Z uvedených důvodů zařazuje Česká obchodní inspekce i tuto verzi stránek stejného provozovatele mezi rizikové weby.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'myshopolo', 
//  description: 'Česká obchodní inspekce registruje vysoký počet stížností, které se provozovatele internetových stránek týkají. Provozovatelem internetových stránek je subjekt se sídlem ve Slovinsku. Stížnosti spotřebitelů upozorňují na nízkou kvalitu zboží a obtíže při vyřizování reklamací. V souvislosti s krizovou situací ohledně onemocnění COVID-19 ČOI obdržela stížnosti týkající se vysokých cen osobních ochranných prostředků, někteří zákazníci dle svých tvrzení údajně obdrželi namísto dezinfekčního prostředku aromatizovanou vodu. Případný nákup na těchto internetových stránkách doporučuje ČOI důkladně uvážit.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'shopolo', 
//  description: 'Česká obchodní inspekce registruje vysoký počet stížností, které se provozovatele internetových stránek týkají. Provozovatelem internetových stránek je subjekt se sídlem ve Slovinsku. Stížnosti spotřebitelů upozorňují na nízkou kvalitu zboží a obtíže při vyřizování reklamací. V souvislosti s krizovou situací ohledně onemocnění COVID-19 ČOI obdržela stížnosti týkající se vysokých cen osobních ochranných prostředků, někteří zákazníci dle svých tvrzení údajně obdrželi namísto dezinfekčního prostředku aromatizovanou vodu. Případný nákup na těchto internetových stránkách doporučuje ČOI důkladně uvážit.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'huglo', 
//  description: 'Dle registrace i obchodních podmínek a fungování stránek se jedná o další mutaci e-shopu stejného provozovatele (ROPETA LTD, identifikační číslo (CRN): 11761407, se sídlem Enterprise House 2 Pass Street, Oldham, Manchester, United Kingdom, OL9 6HZ), který má weby vevio.cz a huglo.cz, před nimi však varuje ČOI již delší dobu. Důvod stejný, tedy z webových stránek není jednoznačně zřejmé, kdo je prodávajícím, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může uplatňovat svá práva. Česká obchodní inspekce registruje vysoký počet stížností, které se těchto různých portálů stejného provozovatele týkají. Z uvedených důvodů zařazuje Česká obchodní inspekce i tuto verzi stránek stejného provozovatele mezi rizikové weby.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'consumermatrends', 
//  description: 'Stránka funguje jen v případě, kdy se Vám otevře sama například přes proklik při kliknutí na spam. Stránka vzbuzuje dojem, že jste byli vybraným uživatelem k odměně od vašeho operátora, avšak jedná se o podvod. Zřejmě bude smyslem stránky sbírat Vaše osobní údaje. Stránky jsou také v češtině. Stránka nepatří oficiálně žádnému operátorovi, nemá s ní nic společného a proto Česká obchodní inspekce před tímto webem varuje. Důrazně doporučuje formulář k údajné výhře nevyplňovat. Více se o této stránce píše i zde: https://www.novinky.cz/internet-a-pc/bezpecnost/clanek/s-mobily-zadarmo-se-roztrhl-pytel-podvodnici-se-vydavaji-i-za-operatory-40317567', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'rusko-na-tvar-kn95-sk', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem či vyplněním osobních údajů na těchto stránkách varuje antivirová firma ESET i Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'rouska-na-oblicej-kn95-cz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem či vyplněním osobních údajů na těchto stránkách varuje antivirová firma ESET i Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lumeo', 
//  description: 'Česká obchodní inspekce registruje vysoký počet stížností, které se provozovatele internetových stránek týkají. Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „virtuální galerii“, jejímž prostřednictvím údajně zboží nabízejí externí subjekty. Obvykle se má jednat o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem u dodavatele“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. V souvislosti s krizovou situací ohledně onemocnění COVID-19 ČOI obdržela stížnosti týkající se přemrštěných cen osobních ochranných pomůcek a velmi dlouhých dodacích lhůt. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lunzo', 
//  description: 'Česká obchodní inspekce registruje vysoký počet stížností, které se provozovatele internetových stránek týkají. Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „virtuální galerii“, jejímž prostřednictvím údajně zboží nabízejí externí subjekty. Obvykle se má jednat o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem u dodavatele“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. V souvislosti s krizovou situací ohledně onemocnění COVID-19 ČOI obdržela stížnosti týkající se přemrštěných cen osobních ochranných pomůcek a velmi dlouhých dodacích lhůt. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'velomont', 
//  description: 'Česká obchodní inspekce registruje vysoký počet stížností, které se provozovatele internetových stránek týkají. Podle informací uvedených na internetových stránkách nejde o klasický e-shop, ale o „virtuální galerii“, jejímž prostřednictvím údajně zboží nabízejí externí subjekty. Obvykle se má jednat o společnosti se sídlem v Číně nebo v jiných asijských zemích, u nichž je pro spotřebitele obtížné ověřit jejich existenci a důvěryhodnost. ČOI registruje stížnosti na dodání zboží s velkou časovou prodlevou, případně nedodání zboží vůbec. Je-li dostupnost označena např. výrazem „skladem u dodavatele“, může to v praxi znamenat, že zboží se nachází v Číně a bude doručeno až za několik týdnů či měsíců. Řešení reklamací a/nebo vracení zboží může být pro spotřebitele obtížné. V souvislosti s krizovou situací ohledně onemocnění COVID-19 ČOI obdržela stížnosti týkající se přemrštěných cen osobních ochranných pomůcek a velmi dlouhých dodacích lhůt. Případný nákup na těchto internetových stránkách doporučujeme důkladně uvážit a před jeho provedením velmi podrobně zkontrolovat dodací lhůty, obchodní podmínky a identitu a důvěryhodnost externího prodávajícího.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'rivalenti', 
//  description: 'Dle registrace i obchodních podmínek a fungování stránek se jedná o další mutaci e-shopu stejného provozovatele (ROPETA LTD, identifikační číslo (CRN): 11761407, se sídlem Enterprise House 2 Pass Street, Oldham, Manchester, United Kingdom, OL9 6HZ), který má weby vevio.cz a huglo.cz, před nimi však varuje ČOI již delší dobu. Důvod stejný, tedy z webových stránek není jednoznačně zřejmé, kdo je prodávajícím, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může uplatňovat svá práva. Česká obchodní inspekce registruje vysoký počet stížností, které se těchto různých portálů stejného provozovatele týkají. Z uvedených důvodů zařazuje Česká obchodní inspekce i tuto verzi stránek stejného provozovatele mezi rizikové weby.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zizer', 
//  description: 'Dle registrace i obchodních podmínek a fungování stránek se jedná o další mutaci e-shopu stejného provozovatele (ROPETA LTD, identifikační číslo (CRN): 11761407, se sídlem Enterprise House 2 Pass Street, Oldham, Manchester, United Kingdom, OL9 6HZ), který má weby vevio.cz a huglo.cz, před nimi však varuje ČOI již delší dobu. Důvod stejný, tedy z webových stránek není jednoznačně zřejmé, kdo je prodávajícím, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může uplatňovat svá práva. Česká obchodní inspekce registruje vysoký počet stížností, které se těchto různých portálů stejného provozovatele týkají. Z uvedených důvodů zařazuje Česká obchodní inspekce i tuto verzi stránek stejného provozovatele mezi rizikové weby.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'diftheme', 
//  description: 'Stránka se otevře teprve po rozkliknutí reklamy na Facebooku, viz obrázek reklamy (https://www.coi.cz/wp-content/uploads/2020/03/nova.png). Po prokliku se však zobrazí lživý text a smyšlený rozhovor s Danielem Takáčem o úžasné šanci zbohatnout, viz obrázek (https://www.coi.cz/wp-content/uploads/2020/03/diftheme.png). Stránka pak láká spotřebitele zadat údaje na anonymním webu seekmob.com a investovat do zázračného zbohatnutí v kryptoměnách. Před těmito stránkami ČOI varuje, web je anonymní a údajně zaručené zbohatnutí se opírá o zkreslená fakta.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'sydstones', 
//  description: 'Stránka se otevře teprve po rozkliknutí reklamy na Facebooku, viz obrázek reklamy (https://www.coi.cz/wp-content/uploads/2020/03/nova.png). Po prokliku se však zobrazí lživý text a smyšlený rozhovor s Danielem Takáčem o úžasné šanci zbohatnout, viz obrázek (https://www.coi.cz/wp-content/uploads/2020/03/sydstones.png). Stránka pak láká spotřebitele zadat údaje na anonymním webu seekmob.com a investovat do zázračného zbohatnutí v kryptoměnách. Před těmito stránkami ČOI varuje, web je anonymní a údajně zaručené zbohatnutí se opírá o zkreslená fakta.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'calvil', 
//  description: 'Dle registrace i obchodních podmínek a fungování stránek se jedná o další mutaci e-shopu stejného provozovatele (ROPETA LTD, identifikační číslo (CRN): 11761407, se sídlem Enterprise House 2 Pass Street, Oldham, Manchester, United Kingdom, OL9 6HZ), který má weby vevio.cz a huglo.cz, před nimi však varuje ČOI již delší dobu. Důvod stejný, tedy z webových stránek není jednoznačně zřejmé, kdo je prodávajícím, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může uplatňovat svá práva. Česká obchodní inspekce registruje vysoký počet stížností, které se těchto různých portálů stejného provozovatele týkají. Z uvedených důvodů zařazuje Česká obchodní inspekce i tuto verzi stránek stejného provozovatele mezi rizikové weby.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'seekmob', 
//  description: 'Stránka láká spotřebitele k zázračnému zbohatnutí na kryptoměnách. Míří sem spotřebitelé nejen z domény destinorama.net uveřejněné níže, kde zázračné zbohatnutí má slibovat Leoš Mareš, jde však o smyšlené údaje a rozhovor, který neexistoval. Stránka zneužívá kryptoměny k nalákání dalších na údajné investice a zázračné zbohatnutí a periodicky obměňuje příběh a mění domény. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce vyplnění formuláře a případné zaplacení zde považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'destinorama', 
//  description: 'Stránka se otevře teprve po rozkliknutí reklamy na Facebooku, viz obrázek reklamy (https://www.coi.cz/wp-content/uploads/2020/03/reklama-mares.png). Mareš se skutečně vyjadřoval v České televizi, tento záběr a zmínka v Událostech ČT ale byla kvůli tomu, že známý moderátor reagoval na to, aby lidé nosili roušky. Po prokliku se však zobrazí lživý text a smyšlený rozhovor s Danielem Takáčem o úžasné šanci zbohatnout, viz obrázek (https://www.coi.cz/wp-content/uploads/2020/03/destinorama.net_.png). Stránka pak láká spotřebitele zadat údaje na anonymním webu seekmob.com a investovat do zázračného zbohatnutí v kryptoměnách. Před těmito stránkami ČOI varuje, web je anonymní a údajně zaručené zbohatnutí se opírá o zkreslená fakta.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bestceler', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kominiksich', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vanslevne', 
//  description: 'Podle informací od spotřebitele po uhrazení za zboží strhnuto z účtu při platbě kartou více, než mělo být. Objednané zboží nepřichází a obchod nekomunikuje, nemá ani kontakty. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'centrum-cesta', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'nowbeadmired', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'levne2020', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'rouska-na-usta-cz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Navíc se nejedná o e-shop v pravém slovy smyslu, útočníkům jde především o sběr dat. Před nákupem či vyplněním osobních údajů na těchto stránkách varuje antivirová firma ESET i Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'onpoint', 
//  description: 'Dle obchodních podmínek je provozovatelem společnost OnPoint.cz, není zde však uvedeno žádné IČO a v obchodním rejstříku není společnost OnPoint.cz registrována. Není tak zjevné, kdo je ve skutečnosti provozovatelem tohoto e-shopu a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'solarnilampycz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'buyonlineto', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'savsmagazin', 
//  description: 'Opuštěná doména, která je po expiraci a těží z historie původně seriozního českého webu, byla jako volná doména koupena jiným subjektem. Překlad do češtiny je strojový, některé věty nedávají smysl. Kontakt na provozovatele naprosto žádný. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. ČOI hodnotí nákup na této doméně jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cpagetti6', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý konopný přípravek proti vysokému krevním tlaku. Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajně firma, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Lékař, který přípravek na stránkách propaguje, je smyšlený a jeho fotografie stažena z fotobanky. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'doktrin', 
//  description: 'Objednané a předem uhrazené zboží podle spotřebitelských informací nepřichází. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bitcoin-billionaire-app', 
//  description: 'Smyšlené příběhy o zázračném zbohatnutí lákají spotřebitele stáhnout si neznámou aplikaci a uvést pak údaje o platební kartě. Příběhy, které spotřebitele mají nalákat, jsou prokazatelně smyšlené. Jeden český příběh se pak uvádí i zde: https://timekeepers-big-box.myshopify.com/products/hamilton-broadway (Smyšlená informace: "Minulý týden se Petr Kellner objevil v pořadu Interview ČT24, který uváděl Daniel Takáč, a oznámil novou „mezeru v zákonech pro bohatství“, o které je prokázané, že z kohokoliv udělá za 3 až 4 měsíce milionáře," což není pravdivá informace, takový rozhovor neproběhl.) Před aplikací a uvedením platebních údajů Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'timekeepers-big-box.myshopify', 
//  description: 'Stránka, která jen po uvedení plné URL zobrazí něco jiného, než uživatelům bez uvedení plné adresy. Smyšlené informace: "Minulý týden se Petr Kellner objevil v pořadu Interview ČT24, který uváděl Daniel Takáč, a oznámil novou „mezeru v zákonech pro bohatství“, o které je prokázané, že z kohokoliv udělá za 3 až 4 měsíce milionáře," což není pravdivá informace, takový rozhovor neproběhl. Stánky prezentují nepravdivé informace a pak odkazují na příhlášení do aplikace, která slibuje velké zisky a uvádí další smyšlené příběhy: https://bitcoin-billionaire-app.com/u/f256743e2962a10b1de0/pages/cz.html', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.erogannd', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý přípravek na rychlou erekci. Obchodní podmínky v češtině zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena údajně firma z Panamy, která figuruje u mnoha jiných rizikových e-shopů. Na stránkách odbíhá odpočítávání času i kusů, které zbývají, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Při aktualizaci stránky však zbývající kusy zase přibudou, jde o klamání spotřebitele. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'heart-tonic', 
//  description: 'Na stránkách je nabízen přípravek proti vysokému tlaku. Výrobek na stránkách doporučuje muž, který je popisován jako "Lékař, kandidát lékařských věd", označení je nesmyslné, chybí jméno lékaře, fotka je však stažena z fotobanky. Obchodní podmínky zde zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz3.micinormnd', 
//  description: 'Na stránkách je nabízen zcela neznámý přípravek proti plísním. Výrobek na stránkách doporučuje muž, který je popisován jako Jiří Jiroutek, doktor - mykolog Institutu lékařské mykologii, avšak taková instituce není vůbec neexistuje. Jméno lékaře není pravdivé, fotka lékaže stažena z fotobanky. Obchodní podmínky zde jsou nedostatečné, provozovatel má být údajně z Panamy. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'iphnelvnpro.thingsyouuse', 
//  description: 'Stránka láká spotřebitele na to, že nový iPhone stojí pouze 25,- Kč místo 25.590,- Kč. Stránky jsou anonymní, spotřebitel je nucen vyplnit kontaktní údaje, aniž by mu byly předem poskytnuty bližší informace o pravidlech a provozovateli stránek. Až po vyplnění kontaktních údajů je spotřebitel drobným písmem informován, že mu bude měsíčně strhávána částka 65 eur z kreditní karty jako členský příspěvek, avšak se neuvádí za jakou službu.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cpgtstream9', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bornacnc', 
//  description: 'Podle podání spotřebitele místo objednaných a předem zaplacených bot v hodnotě 1600 Kč přišly sluneční brýle bezvýznamné ceny. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'dareabeauty', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pandamax', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lottalovee', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pomocsukolem', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'infrateplomer-cz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Navíc se nejedná o e-shop v pravém slovy smyslu, útočníkům jde především o sběr dat. Před nákupem či vyplněním osobních údajů na těchto stránkách varuje antivirová firma ESET i Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lifeofatraderstories', 
//  description: 'Na stránkách je údajný francouzský profesor. Ten však neexistuje, jeho příběh je podvod, který zneužívá kryptoměny nebo údajné investice na burze a periodicky obměňuje příběh a mění domény. Příběh údajného profesora se vás bude snažit přesvědčit mimo jiné pomocí falešných recenzí a zkušeností svých neexistujících klientů, pozná se to podle fotek z fotobanky. Pokud si od něj startovací balíček objednáte, přijde vám poštou na dobírku balík s bezcennými papíry. Samotné investování do kryptoměny nebo na burze vás nenaučí a úspěch nezaručí. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'libmyexz.smilewinter', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt na bolesti kloubů. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena společnost z Panamy. Na stránkách probíhá odpočítávání času, po který uvedená nabídka platí, avšak časomíra se vrací zpět, jde o nekalou obchodní praktiku a nátlak na spotřebitele, aby nakoupil a neměl čas o nabídce přemýšlet. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'moje-lekarna', 
//  description: 'Stránky nemají potřebná povolení k prodeji v oblasti lékárenství a nabízejí přípravky určené do lékáren neoprávněně (jedná se například o nabídku přípravku viagra, který je výhradně na lékařský recept, stránky jej však nabízejí i bez receptu). Přípravky jsou navíc nabízeny za mnohem nižší ceny, lze tak důvodně pochybovat i o vlastnostech nabízených výrobků. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'chcemenapudu', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pietrocucine', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pivokokes', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a kabelky. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'jitkacervenkova', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt, stránky jsou zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'invplan', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a kabelky. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vagonrock', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a kabelky. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'yoor', 
//  description: 'Spotřebitelka si ve svém podání stěžuje na to, že stránka vyžaduje při objednávce zadání citlivých údajů o platební kartě přímo do formuláře na stránkách. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'novebytyvrchlabi', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fialkafest', 
//  description: 'Spotřebitel si ve svém podání stěžuje na to, že stránka vyžaduje při objednávce zadání citlivých údajů o platební kartě přímo do formuláře na stránkách. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'i-healthy-beauty', 
//  description: 'Spotřebitelé jsou v reklamě odkazováni na tyto stránky vypadající téměř jako seriozní zpravodajský web. Na stránkách je smyšlený příběh o českém studentovi, který deostal cenu Excellence Award v oblasti zdravotnictví, avšak taková informace není pravdivá. Pod smyšleným příběhem je prezentován neznámý přípravek k údajné léčbě kloubů. Výrobek není schválen Ústavem pro kontrolu léčiv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pohodabrezany', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím jsou především kabelky a boty. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'buniko', 
//  description: 'Spotřebitelka si ve svém podání stěžuje na to, že po uhrazení přišlo zboží jiné kvality. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'dodavatelautodilu', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz1.energy-saving-b0x', 
//  description: 'Stránky odkazují formou článku na prodej zařízení na šetření spotřeby elektrické energie. Toto zařízení však energii nemůže ušetřit, ale naopak ji spotřebovává. Může se navíc jednat o nebezpečný výrobek. V roce 2012 byl do systému RAPEX nahlášen velmi podobný výrobek Power Factor Saver, výrobek představoval nebezpečí úrazu elektrickým proudem, protože napětí na kolících po odpojení výrobku ze zásuvky bylo příliš vysoké. Internetové stránky jsou provozovány zahraničními osobami, které figurují u jiných rizikových webů, sídlo uvádějí v Panamě.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'xxlobchod', 
//  description: 'Obchod vyžaduje pouze platbu předem. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'dresyonline', 
//  description: 'Obchod vyžaduje pouze platbu předem. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'dreamchaserloveyourself', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'onesgos', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'homegaden', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vevio', 
//  description: 'Z webových stránek není jednoznačně zřejmé, kdo je prodávajícím, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může uplatňovat svá práva. Česká obchodní inspekce registruje vysoký počet stížností, které se tohoto internetového obchodu týkají. Z uvedených důvodů zařazuje Česká obchodní inspekce stránky mezi rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'huglo', 
//  description: 'Z webových stránek není jednoznačně zřejmé, kdo je prodávajícím, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může uplatňovat svá práva. Česká obchodní inspekce registruje vysoký počet stížností, které se tohoto internetového obchodu týkají. Z uvedených důvodů zařazuje Česká obchodní inspekce stránky mezi rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lifeblg', 
//  description: 'Na základě informací TV Prima zařazen tento web mezi rizikové. Spotřebitel si pokaždé "vylosuje" slevu 50% a poté má omezený čas k vyplnění objednávkového formuláře. Na stránkách je příběh ženy, která má mít 120 let a nabízen je neznámý přípravek na prodloužení života. Příběh je smyšlený, stejně jako loterie na stránkách, kde zatočením kola si spotřebitel vždy vylosuje údajnou slevu 50%. Výrobek není schválen Ústavem pro kontrolu léčiv, prodejce je anonymní. Nákup zde za rizikový považuje také Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tenisky.summerumen', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může uplatňovat svá práva. Obsah obchodních podmínek hrubě odporuje právním předpisům. Internetový obchod je provozován subjektem se sídlem mimo členské státy Evropské unie, ačkoliv internetový obchod může u spotřebitelů vzbuzovat dojem, že je provozován subjektem se sídlem v České republice nebo Evropské unii. Spotřebitelé nemohou uplatňovat svá práva, nebo je tato možnost významně ztížena.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kameramankaltm', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může uplatňovat svá práva. E-shop nezveřejňuje obchodní podmínky, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mobigem', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'studiorelax-benatky', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a kabelky. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cestovanijeradost', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'wifi-camera', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může uplatňovat svá práva., Internetový obchod je provozován subjektem se sídlem mimo členské státy Evropské unie, ačkoliv internetový obchod může u spotřebitelů vzbuzovat dojem, že je provozován subjektem se sídlem v České republice nebo Evropské unii, např. e-shop v českém jazyce je provozován subjektem se sídlem v Číně. Spotřebitelé nemohou uplatňovat svá práva, nebo je tato možnost významně ztížena. Není možno odstoupit od smlouvy ani reklamovat.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'trendprace', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'anteny-satelity-ezs', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'malirstvidulik', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'etershop', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'prodej', 
//  description: 'E-shop nezveřejňuje obchodní podmínky, případně obsah obchodních podmínek hrubě odporuje právním předpisům. Eshop vymáhá platbu za registraci, nákup v bitcoinech, vyhrožuje soudem, nyní dočasně nedostupný. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'malechastore', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'luckydevil', 
//  description: 'Stránky po rozkliknutí neukáží nic, ale při kliknutí na konkrétní reklamu se ukáže nabídka společnosti O2, která informuje o údajné výhře. Print screen této nabídky má Česká obchodní inspekce k dispozici. Stránky vytvářejí dojem výhry, aby tam spotřebitel vyplnil formulář, kde zadá informace o sobě, především jméno, telefonní číslo a e-mail. Jako provozovatel webu je uvedena společnost O2, které nemá se stránkami nic společného. Stránky jsou tedy zcela anonymní a spotřebitel neví, vůči komu může nárokovat svá práva. Před vyplněním formuláře se svými osobnímu údaji na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'jsdrazice', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'jkprofistav', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'inoinfra', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'drogerieevropa', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení, obuv a kabelky. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vbbagency', 
//  description: 'Podle informací od spotřebitele po uhrazení platby předem výrobek nedorazil. Nejsou uvedeny žádné identifikační údaje prodávajícího, jediným kontaktem je formulář na webu. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Z výše uvedených důvodů hodnotí ČOI jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz12.hondrocreamnd', 
//  description: 'Další stránky nabízejí údajně téměř zázračný přípravek na klouby. Na stránkách je prezentován příběh studenta, který měl tento unikátní preparát vymyslet. Příběh je smyšlený, stejně jako loterie na stránkách, kde zatočením kola si spotřebitel vždy vylosuje údajnou slevu 50%. Výrobek není schválen Ústavem pro kontrolu léčiv, prodejce je anonymní. Nákup zde za rizikový považuje také Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'adnet99', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji přes reklamu, slibují neznámý přípravek proti papalomaviru. Informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena údajně firma z Panamy, která figuruje u mnoha jiných rizikových e-shopů, které nabízejí celou řadu dalších neznámých výrobků např. na hubnutí, proti kouření, prostatě, na klouby, srdeční hypertenzi a další. Výrobky nejsou schváleny Ústavem pro kontrolu léčiv, lékaři před těmito neznámými přípravky varují. Nákup zde za rizikový považuje také Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cs-ny.opulence-4u', 
//  description: 'Na stránkách je údajný francouzský profesor. Ten však neexistuje, jeho příběh je podvod, který zneužívá kryptoměny nebo údajné investice na burze a periodicky obměňuje příběh a mění domény. Příběh údajného profesora se vás bude snažit přesvědčit mimo jiné pomocí falešných recenzí a zkušeností svých neexistujících klientů, pozná se to podle fotek z fotobanky. Pokud si od něj startovací balíček objednáte, přijde vám poštou na dobírku balík s bezcennými papíry. Samotné investování do kryptoměny nebo na burze vás nenaučí a úspěch nezaručí. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny či na burzách, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'investplast', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'porviva', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Podle informací od spotřebitele místo originálního výrobku dorazil zcela nepochybně padělek mnohem nižší hodnoty. Spotřebitel neví, kam se obrátit, aby uplatnil svá práva. Není známo, kdo stránky provozuje. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'blogstext', 
//  description: 'Stránky odkazují formou článku na prodej zařízení na šetření spotřeby elektrické energie. Toto zařízení však energii nemůže ušetřit, ale naopak ji spotřebovává. Může se navíc jednat o nebezpečný výrobek. V roce 2012 byl do systému RAPEX nahlášen velmi podobný výrobek Power Factor Saver, výrobek představoval nebezpečí úrazu elektrickým proudem, protože napětí na kolících po odpojení výrobku ze zásuvky bylo příliš vysoké. Internetové stránky jsou provozovány zahraničními osobami, které figurují u jiných rizikových webů, sídlo uvádějí v Panamě.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.eenergynd', 
//  description: 'Na těchto stránkách je nabízen prodej zařízení na šetření spotřeby elektrické energie. Toto zařízení však energii nemůže ušetřit, ale naopak ji spotřebovává. Může se navíc jednat o nebezpečný výrobek. V roce 2012 byl do systému RAPEX nahlášen velmi podobný výrobek Power Factor Saver, výrobek představoval nebezpečí úrazu elektrickým proudem, protože napětí na kolících po odpojení výrobku ze zásuvky bylo příliš vysoké. Internetové stránky jsou provozovány zahraničními osobami, které figurují u jiných rizikových webů, sídlo uvádějí v Panamě.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'jd2trains', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'galerie-cafe', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'spssourosice', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hrbatuvkostelec', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hot-shopping-review', 
//  description: 'Stránky se prezentují jako Český lékařský portál, avšak nejde o žádný oficiální portál skutečných lékařů. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na hubnutí. Stránky jsou úplně stejné, jako jiný obdobný "lékařský portál", který podobným způsobem nabízí přípravek na klouby. Fotka údajného lékaře uvedená na stránkách v pravém rohu nahoře, je dle jiného podobného portálu Prof. Jaromir Kosinský (odborník), ten však neexistuje. Fotka údajně spokojených zákazníků je stažena z fotobanky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'global-package-delivery', 
//  description: 'Stránky na první pohled vypadají neškodně, ve skutečnosti po kliknutí na reklamu se zobrazí verze stránek, které vypadají jako oficiální stránky operátora O2 a sdělují návštěvníkovi, že vyhrál cenu a má zadat na sebe telefon a další údaje. Jako provozovatel je uvedena společnost O2, která nemá se stránkami nic společného. České obchodní inspekce před zadáváním údajů na těchto stránkách varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'extrifitslovakia', 
//  description: 'Stránky se prezentují jako Český lékařský portál, avšak nejde o žádný oficiální portál skutečných lékařů. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na růst svalů. Stránky jsou úplně stejné, jako jiný obdobný "lékařský portál", který podobným způsobem nabízí přípravek na klouby. Fotka údajného lékaře uvedená na stránkách v pravém rohu nahoře, je dle jiného podobného portálu Prof. Jaromir Kosinský (odborník), ten však neexistuje. Fotka údajně spokojených zákazníků je stažena z fotobanky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fashion4vip', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hobbsfashiondresses', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cornermag', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zdravimazelenou', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz8.maxisizend', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji přes reklamu, slibují neznámý přípravek na zvětšení mužství. Informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena údajně firma z Panamy, která figuruje u mnoha jiných rizikových e-shopů, které nabízejí celou řadu dalších neznámých výrobků např. na hubnutí, proti kouření, prostatě, na klouby, srdeční hypertenzi a další. Výrobky nejsou schváleny Ústavem pro kontrolu léčiv, lékaři před těmito neznámými přípravky varují. Nákup zde za rizikový považuje také Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'shockingdiscover', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek pro lidské zdraví. Kontaktem na webu je výhradně formulář a opět tel. číslo +420 234102147, které se objevuje u celé řady rizikových e-shopů, viz níže. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'scientificnewsforyou', 
//  description: 'Stránky tvářící se jako oficiální článek o zdraví popisují údajně úžasné vlastnosti neznámého výrobku. Fotka údajně spokojené zákaznice stažena z fotobanky. Fotka údajně spokojených zákazníků je stažena z fotobanky. Jakmile chcete opustit stránku, vyskočí "varování" a "ještě lepší" nabídka, která nutí spotřebitele k nákupu. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'topicphones', 
//  description: 'Stránky zneužívají logo internetového portálu iDnes.cz a lákají spotřebitele na mobilní telefon za málo peněz. Jako provozovatel webu je uvedena společnost MAFRA, a.s., která sama ČOI na tento web upozornila s tím, že zneužívá její značku. Na webu je tedy uveden smyšlený provozovatel a spotřebitel je lákán zadat údaje o sobě a platební kartě, následně mu z účtu jsou strhávány peníze. Před tímto webem Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'czechrepublicflags', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'matracepruzinove', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím jsou především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zelenykruholomouc', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím jsou především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mmarketing', 
//  description: 'Stránky nemají žádné obchodní podmínky, není žádný kontakt, jsou zcela anonymní. Místo firmy, která prodávala bio výrobky, jak napovídá název domény, nyní je na webu vystavena obuv a oblečení. Na doménu nás upozornili nejen spotřebitelé, ale i původní vlastník, který doménu neprodloužil. Stránky považuje ČOI za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'czkmaxobchodprodej', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bodywellness247', 
//  description: 'Stránky se prezentují jako oficiální zdravotní portál, avšak nejde o žádný oficiální portál skutečného "hubnoucího" institutu. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na hubnutí. Marek A. Štěpán je údajně odborník na molekulární biologii, avšak tento domnělý vědec nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu. Fotka údajně spokojených zákazníků je stažena z fotobanky. Jakmile chcete opustit stránku, vyskočí "varování" a "ještě lepší" nabídka, která nutí spotřebitele k nákupu. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'antikwariat', 
//  description: 'Spotřebitelka uvedla, že jí nebyly dodány objednané knihy a obchod nekomunikuje. Na internetových stránkách nejsou zveřejněny identifikační údaje prodávajícího, je zde uvedena pouze e-mailová adresa, telefonní číslo „Pražského depozitáře“ a adresa náměstí Míru 47, 763 16 Fryšták, na kterém se nachází úplně jiný provozovatel - prodejna potravin (večerka). Vyhledáním v registru internetových domén cz.nic nebylo možné identifikovat vlastníka této domény. Spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'sonzich', 
//  description: 'Spotřebitelka, která se na Českou obchodní inspekci obrátila, doložila platbu na webu, avšak zboží nedorazilo. Není koho kontaktovat. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.prostero-official', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji přes reklamu či spam, slibují neznámý přípravek na zánět prostaty. Nabízené výrobky, které mají sloužit k léčení zánětů prostaty, nejsou schváleny Ústavem pro kontrolu léčiv, lékaři před těmito neznámými přípravky varují. Obchodní podmínky zde jsou nedostatečné, provozovatel stránek je anonymní.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'clovektradice', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'unique-modules', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'ateliermanes', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím jsou především hračky. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'robertadamek', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'time-for-investment', 
//  description: 'Na stránkách je uvedeno jméno profesora Graham Le Roux z Harvardu. Profesor Graham Le Roux neexistuje, jeho příběh je podvod, který zneužívá kryptoměny a periodicky obměňuje jejich nabídku. Graham Le Roux se vás bude snažit přesvědčit mimo jiné pomocí falešných recenzí a zkušeností svých neexistujících klientů, pozná se to podle fotek z fotobanky. Pokud si od něj startovací balíček objednáte, přijde vám poštou na dobírku balík s bezcennými papíry, vlastníky žádné skutečné kryptoměny se nestanete. Samotné investování do kryptoměny však může být i značně prodělečné. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bundyakabaty', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'sidestreet', 
//  description: 'Spotřebitelka si na www.sidestreet.cz objednala značkovou obuv, platba byla možná výhradně předem. Po delším čase přišla jiná obuv, nekvalitní přepravcem z Číny. Reklamaci prodejce neřeší. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hry-prodivky', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.otsnd', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji přes reklamu či spam, slibují neznámý přípravek na hubnutí. Informace uvedené na stránkách jsou smyšlené, protože například vedle fotografie údajného lékaře-specialisty je uvedeno jméno Lukáš Wohanka, ve slovenské verzi stránek (sk.otsnd.com) je u stejné fotografie jméno lékaře Filip Ňachaj. Stejně tak jsou smyšlené i recenze údajně spokojených zákazníků. Vedle stejných fotografií jsou opět jiná jména. Informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena údajně firma z Panamy, která figuruje u mnoha jiných rizikových e-shopů, které nabízejí celou řadu dalších neznámých výrobků např. na hubnutí, proti kouření, prostatě, na klouby, srdeční hypertenzi a další. Výrobky nejsou schváleny Ústavem pro kontrolu léčiv, lékaři před těmito neznámými přípravky varují. Nákup zde za rizikový považuje také Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'andreatailor', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cuteelva', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'irotoped', 
//  description: 'Podle podání spotřebitele místo značkových bot zaslány plastové brýle za zlomek ceny. Prodejce dle spotřebitele odmítá řešit výměnu zboží za skutečně objednané. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.erofertilnd', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji přes reklamu, slibují neznámý přípravek na rychlou erekci. Informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena údajně firma z Panamy, která figuruje u mnoha jiných rizikových e-shopů, které nabízejí celou řadu dalších neznámých výrobků např. na hubnutí, proti kouření, prostatě, na klouby, srdeční hypertenzi a další. Výrobky nejsou schváleny Ústavem pro kontrolu léčiv, lékaři před těmito neznámými přípravky varují. Nákup zde za rizikový považuje také Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz1.recardiond', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt na léčbu srdeční hypertenze. Jedná se však o neznámý přípravek, který má sloužit k léčbě, aniž by byl schválen Státním ústavem pro kontrolu léčiv. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena společnost z Panamy. Na stránkách probíhá odpočítávání času, po který uvedená nabídka platí, avšak časomíra se vrací zpět, jde o nekalou obchodní praktiku a nátlak na spotřebitele, aby nakoupil a neměl čas o nabídce přemýšlet. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'enence', 
//  description: 'Na stránkách je nabízen univerzální překladači (o jeho vlastnostech lze pochybovat, na žádném českém a ani světovém trhu se totiž nenachází podobný přístroj, který by dokázal univerzálně překládat). Na e-shop se dostane uživatel cestou přes reklamu, která ho přesměruje nejprve na níže uvedený server tvářící se jako seriozní zpravodajský web a proklikem na tlačítko vyzývající k nákupu. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'muama-enence', 
//  description: 'Spotřebitelé jsou v reklamě odkazovány na tyto stránky vypadající téměř jako seriozní zpravodajský web. Na stránkách je pak informace o univerzálním překladači, ačkoli o jeho vlastnostech lze pochybovat. (Na žádném českém a ani světovém trhu se totiž nenachází podobný přístroj, který by dokázal univerzálně překládat.) Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zadaas', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'primanastroje', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'itmartin', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz5.varicobnd', 
//  description: 'Na webových stránkách je nabízen naprosto neznámý výrobek jako pomoc lidem s křečovými žílami. Jako prodejce je uvedena firma z Panamy, která se objevuje u celé řady rizikových e-shopů, viz níže. Spotřebitel je na tyto stránky odkazován ve spamech, které se šíří elektronickou poštou. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lacarreta', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Na webu je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'rascalstudio', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Na webu je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'powerstyleled-cz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'keenboty', 
//  description: 'Na stránkách tohoto internetového obchodu není uveden kontakt. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'easyart24', 
//  description: 'Na základě podání spotřebitelů zahájila Česká obchodní inspekce kontrolu v rámci svých dozorových pravomocí, a zahájila také řízení z moci úřední pro nesoučinnost. Podnikatelský subjekt i dle zaslaných podnětu od spotřebitelů neakceptuje odstoupení od kupní smlouvy, finanční částky za nedodané výrobky nevrací. Dle informací uvedených v podání je společnost nekontaktní, nereaguje na e-maily.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'treninkplus', 
//  description: 'Na odstoupení od kupní smlouvy do 14 dnů bez udání důvodu nikdo nereaguje. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pandoraeshop', 
//  description: 'Podle podání spotřebitelů po objednávce dorazí zřejmě padělky, na odstoupení od kupní smlouvy do 14 dnů bez udání důvodu nikdo nereaguje. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'netwhisky', 
//  description: 'Spotřebitelka si objednala plavky v domnění, že si objednává výrobek z Rakouska. Místo objednaného zboží byl doručen pouťový prstýnek z Číny. Nepodařilo se ani dohledat příjemce platby dle bankovního výpisu. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'klarafoti', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'ingressmania', 
//  description: 'Na webu je nabídka obuvi, zaplacení pouze kartou. Stržena jiná – mnohem vyšší částka. Na reklamace nikdo nereaguje. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zethadesign', 
//  description: 'Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz-xhose1', 
//  description: 'Na stránky jsou lidé odkazováni ve spamech, které se šíří elektronickou poštou. Po kliknutí dle spotřebitelských informací chodí více nevyžádaných nabídek. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, vůči komu může nárokovat svá práva. Jediným kontaktem je zmíněný formulář pro vyplnění. Před vyplněním formuláře se svými osobnímu údaji na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'rozprasovaci-brana-cz', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují rozprašovač vody. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bezdratova-sluchatka-cz', 
//  description: 'Na stránky jsou lidé odkazováni ve spamech, které se šíří elektronickou poštou. Po kliknutí dle spotřebitelských informací chodí více nevyžádaných nabídek. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, vůči komu může nárokovat svá práva. Jediným kontaktem je zmíněný formulář pro vyplnění. Před vyplněním formuláře se svými osobnímu údaji na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'coolbox1-cz', 
//  description: 'Na stránky jsou lidé odkazováni ve spamech, které se šíří elektronickou poštou. Po kliknutí dle spotřebitelských informací chodí více nevyžádaných nabídek. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, vůči komu může nárokovat svá práva. Jediným kontaktem je zmíněný formulář pro vyplnění. Před vyplněním formuláře se svými osobnímu údaji na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'podlozka-na-grilovanicz', 
//  description: 'Na stránky jsou lidé odkazováni ve spamech, které se šíří elektronickou poštou. Po kliknutí dle spotřebitelských informací chodí více nevyžádaných nabídek. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, vůči komu může nárokovat svá práva. Jediným kontaktem je zmíněný formulář pro vyplnění. Před vyplněním formuláře se svými osobnímu údaji na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'snaponsmilecz', 
//  description: 'Na stránky jsou lidé odkazováni ve spamech, které se šíří elektronickou poštou. Po kliknutí dle spotřebitelských informací chodí více nevyžádaných nabídek. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, vůči komu může nárokovat svá práva. Jediným kontaktem je zmíněný formulář pro vyplnění. Před vyplněním formuláře se svými osobnímu údaji na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'jednookydalekohledcz', 
//  description: 'Na stránky jsou lidé odkazováni ve spamech, které se šíří elektronickou poštou. Po kliknutí dle spotřebitelských informací chodí více nevyžádaných nabídek. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, vůči komu může nárokovat svá práva. Jediným kontaktem je zmíněný formulář pro vyplnění. Před vyplněním formuláře se svými osobnímu údaji na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'snaponsmile', 
//  description: 'Na stránky jsou lidé odkazováni ve spamech, které se šíří elektronickou poštou. Po kliknutí dle spotřebitelských informací chodí více nevyžádaných nabídek. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, vůči komu může nárokovat svá práva. Jediným kontaktem je zmíněný formulář pro vyplnění. Před vyplněním formuláře se svými osobnímu údaji na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'akademie-rozvojovych-kurzu', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, vůči komu může nárokovat svá práva. Jediným kontaktem je formulář pro vyplnění pro spotřebitele. Před vyplněním formuláře se svými osobnímu údaji na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'satisfactional-survey-platform', 
//  description: 'Doména se ukáže teprve v případě, kdy spotřebitel proklikne přes reklamu, ostatním se zobrazuje zcela jiný web. Avšak těm, kteří přijdou přes reklamu, se na stránce zobrazí například soutěž České pošty o mobilní telefony. Fakticky se ale nejedná o oficiální soutěž České pošty, cílem je sbírat kontaktní údaje na spotřebitele, především se žádá platná e-mailová adresa. Spotřebitel je nucen vyplnit údaje, aby se mohl zúčastnit soutěže o mobilní telefony. Žádná takové soutěž však není oficiální soutěží České pošty. Na stránkách je navíc zneužito logo České pošty. Česká obchodní inspekce před vyplněním údajů na tomto webu spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz1.artrovexnd', 
//  description: 'Stránky nabízejí jménem doktora Mirka Rosického lék na klouby. Avšak tento domnělý vědec nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu. Fotka údajně spokojených zákazníků je stažena z fotobanky. Jakmile chcete opustit stránku, vyskočí "varování" a "ještě lepší" nabídka, která nutí spotřebitele k nákupu. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vseprosebe', 
//  description: 'Stránky mají různé podoby, především po kliknutí na reklamu či spam vás přivedou na stránku, která slibuje jménem doktora Karla Kirschmayera úžasný lék na klouby. Avšak tento domnělý vědec nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu. Fotka údajně spokojených zákazníků je stažena z fotobanky. Jakmile chcete opustit stránku, vyskočí "varování" a "ještě lepší" nabídka, která nutí spotřebitele k nákupu. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'monili', 
//  description: 'Šetřením České obchodní inspekce bylo zjištěno, že výše uvedený internetový portál www.monili.cz byl ke dni 16.10.2019 aktivní, přestože IČO:05568684 je v registru Živnostenského rejstříku evidováno jako neplatné (datum zániku ke dni 17.9.2019). Dle informací od spotřebitelů je fyzická osoba nekontaktní, nereaguje na e-maily, případně nevyzvedává zásilky, které se následně vracejí zpět spotřebitelům jako nevyzvednuté. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'xboxsleva', 
//  description: 'Jako provozovatel webu je uveden subjekt EMAX s.r.o., takový však neexistuje. Na stránkách ani není uvedeno žádné IČO společnosti. Spotřebitel je tlačen k platbě předem, navíc informace o prodejci jsou vymyšlené. Plabu předem prodejce požadoval odeslat na účet patřící společnosti Google a sloužící jako kredit pro jednotlivé uživatele k tomu, aby si zaplatili zobrazování reklam u společnosti provozující vyhledávač Google přes tzv. systém Adwords. Účet neslouží k platbě za žádné zboží, ale slouží výhradně pro kredit ke zobrazování dalších reklam. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'czech.freshfingers', 
//  description: 'Na stránkách je nabízen zcela neznámý přípravek proti plísním. Obchodní podmínky zde jsou nedostatečné, provozovatel stránek je anonymní. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz-baterie', 
//  description: 'Podle informací od spotřebitele objednané zboží nebylo doručeno. Jako provozovatel webu je uvedena firma z Hong Kongu, na reklamace spotřebitele nereaguje. Informace o provozovateli nelze ověřit. Obchodní podmínky neexistují, spotřebitel se marně snažil uplatnit svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'jedinecnydiar', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'prollercz', 
//  description: 'Na stránky jsou lidé odkazováni ve spamech, které se šíří elektronickou poštou. Po kliknutí dle spotřebitelských informací chodí více nevyžádaných nabídek. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, vůči komu může nárokovat svá práva. Jediným kontaktem je zmíněný formulář pro vyplnění. Před vyplněním formuláře se svými osobnímu údaji na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mycards24', 
//  description: 'Na stránky jsou lidé odkazováni ve spamech, které se šíří elektronickou poštou. Nabídka finanční úspory za stravu je nicneříkající, obecná a web je jednostránkový, kde může spotřebitel výhradně vyplnit formulář a odsouhlasit zasílání nabídek, ačkoli není předem seznámen s charakterem těchto nabídek. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, vůči komu může nárokovat svá práva. Jediným kontaktem je zmíněný formulář pro vyplnění. Před vyplněním formuláře se svými osobnímu údaji na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'dreveneschodistebrno', 
//  description: 'Po zaplacení kartou stržena částka vyšší. Po měsících čekání doručena místo mokasín kšiltovka. Na uplatnění práva z vadného plnění či odstoupení od smlouvy obchodník provozující web reagoval výhradně nabídkou slevy. Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bitvaoberlin', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'netcistirny', 
//  description: 'Podle podání spotřebitele objednané zboží nebylo doručeno, kontakt na provozovatele e-shopu je výhradně přes webový formulář, na ten však nikdo nereaguje. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'floryday', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tendaisy', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'go-and-fly', 
//  description: 'Dle spotřebitelského podnětu povedena kontrola a zjištěno, že webové stránky jsou zcela anonymní. Podle ověření České obchodní inspekce neodpovídá ceník na stránkách skutečnosti, provozovatel je navíc neznámý a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před využitím služeb nabízených na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hotinzerce', 
//  description: 'Podle podání spotřebitele (doloženo SMS komunikací) na nabídku inzerce zdarma bylo zareagováno, avšak po podání inzerátu je požadována úhrada částky 2420 Kč. S ohledem na skutečnost, že domény mají sice odkazy na provozovatele služby třetí strany (zpoplatněných SMS, provozovatelů platebních systémů), avšak jako provozovatel webu není uvedeno IČO subjektu, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí, nejsou ani v přehledu podstránek (tzv. sitemap). Jedinou stránkou, která se blíží smyslu obchodních podmínek, je stránka "Pravidla", ta však povinné údaje o provozovateli také neobsahuje. Před nákupem služeb na tomto inzertním portále Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'penzion-u-petry', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Podle podání spotřebitele přišlo po zaplacení zboží úplně jiné mnohem menší hodnoty. Není koho kontaktovat. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hradnitoulky', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cistyprostejov', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pocketmovies', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'ukapalinu', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Podle spotřebitelského podání po úhradě platby předem bylo dodáno jiné zboží. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tytiskarny', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Lokace IP adresy webových stránek je v zahraničí, spotřebitelům bylo doručeno zboží jiné kvality, dokonce každá bota jiná, na reklamace nikdo nereaguje, chybí kontaktní údaje (k dispozici je pouze kontaktní formulář). Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.suganormnd', 
//  description: 'Na webových stránkách je nabízen naprosto neznámý výrobek jako pomoc pacientům při cukrovce, který není registrovaný u Státního ústavu pro kontrolu léčiv. Jako prodejce je uvedena firma z Panamy, která se objevuje u celé řady rizikových e-shopů, viz níže. Spotřebitel je na tyto stránky odkazován ve spamech, které se šíří elektronickou poštou. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hracky-litomysl', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'genfit', 
//  description: 'Podle informací spotřebitele při platbě za zboží z tohoto internetového obchodu byla z platební karty nakonec stržena částka vyšší, konkrétně místo cca 1800 Kč suma přibližně 2000 Kč. Částka byla zaúčtována v čínských juanech. Následně banka kontaktovala spotřebitele s tím, že byl proveden útok na jeho platební kartu, údajně došlo k dalším pokusům o stržení peněz, což vedlo k zablokování platební karty. Zboží podle spotřebitele nepřichází. Místo kontaktu je na stránkách pouze kontaktní formulář. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bartendersteam', 
//  description: 'Opuštěná doména, která je po expiraci a těží z historie původně seriozního českého webu, byla jako volná doména koupena jiným subjektem. Na e-shopu je nabízeno především oblečení a boty. Překlad do češtiny je strojový, některé části nejsou vůbec přeloženy, některé věty nedávají smysl. Kontakt na provozovatele naprosto žádný. Podle spotřebitelského podání po úhradě platby předem zboží nebylo dodáno, nikdo nekomunikuje. Na dotazy vznesené přes formulář na stránkách nikdo nereaguje. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fashionclothingforsale', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Podle spotřebitelského podání po úhradě platby předem zboží nebylo dodáno, nikdo nekomunikuje. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'sandiegopegasus', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Podle spotřebitelského podání po úhradě platby předem zboží nebylo dodáno, nikdo nekomunikuje. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'gizemcansin', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Podle spotřebitelského podání po úhradě platby předem zboží nebylo dodáno, nikdo nekomunikuje. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'projekt-nadani', 
//  description: 'Opuštěná doména byla jako volná koupena jiným subjektem. Na e-shopu je nabízeno především oblečení a boty. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Podle spotřebitelského podání po úhradě platby předem zboží nebylo dodáno, nikdo nekomunikuje. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'elko-stovicek', 
//  description: 'Opuštěná doména, která je po expiraci a těží z historie původně seriozního českého webu, byla jako volná doména koupena jiným subjektem. Na e-shopu je nabízeno především oblečení a boty. Překlad do češtiny je strojový, některé věty nedávají smysl. Kontakt na provozovatele naprosto žádný. Podle spotřebitelského podání po úhradě platby předem zboží nebylo dodáno, nikdo nekomunikuje. ČOI hodnotí nákup na této doméně jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lingfluent', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.bactefortnd', 
//  description: 'Na webových stránkách probíhá odpočítávání času, po který platí údajně výhodná nabídka. Nicméně časomíra se znovu druhý den zrestartuje. Je to nátlak na spotřebitele s cílem prodat mu výrobek, ačkoli o jeho vlastnostech jsou pochyby, prodejce se pyšní tím, že zbaví spotřebitele všech bakterií. Výrobek neznámého složení má mít až zázračné vlastnosti. Jeko prodejce je uvedena firma z Panamy, obchodní podmínky zcela chybí. Recenze spotřebitelů jsou smyšlené, protože na stránkách v jiných jazykových mutacích (např. sk.bactefortnd.com, pl.bactefortnd.com) podobách mají zcela jiná jména, fotky zůstávají (jsou staženy z fotobank). Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'chalupa-servis', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bouceksport', 
//  description: 'Na Českou obchdní inspekci se obrátil bývalý majitel domény, který se cítí stránkami poškozován. Stránky neprodloužil, zaplatil si je anonymní subjekt, který nabízí především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: '4bodyoffer', 
//  description: 'Stránky se prezentují jako oficiální lékařská portál Central Slimming Institute, avšak nejde o žádný oficiální portál skutečného "hubnoucího" institutu. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na hubnutí. Fotka uvedená na stránkách, kde je uveden odborník prof. Marek A. Štěpán, je stažena z fotobanky. Marek A. Štěpán je údajně odborník na molekulární biologii, avšak tento domnělý vědec nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu. Fotka údajně spokojených zákazníků je stažena z fotobanky. Jakmile chcete opustit stránku, vyskočí "varování" a "ještě lepší" nabídka, která nutí spotřebitele k nákupu. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cs-go.slimmingdetox', 
//  description: 'Stránky se prezentují jako oficiální lékařská portál Central Slimming Institute, avšak nejde o žádný oficiální portál skutečného "hubnoucího" institutu. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na hubnutí. Fotka uvedená na stránkách, kde je uveden odborník prof. Marek A. Štěpán, je stažena z fotobanky. Marek A. Štěpán je údajně odborník na molekulární biologii, avšak tento domnělý vědec nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu. Fotka údajně spokojených zákazníků je také stažena z fotobanky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pocitacefrydlant', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'evertech', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva, platba za zboží je vyžadována výhradně předem. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'skechersbotyoutlet', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'databazecitatu', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'apa-esox', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'allrad', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'eshopie', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'eximor', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'adam-elektro', 
//  description: 'Na stránkách chybí info o prodávajícím, subjekt pod uvedeným IČO nemá živnostenské oprávnění na prodej zboží. Osoba, které patří uvedené IČO, nemá údajně se stránkami nic společného. Na webu jsou výrazně nižší ceny zboží než u konkurence, platba za zboží je vyžadována výhradně předem. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'penzion68', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především oblečení. Na stránce nejsou uvedeny identifikační údaje prodávajícího, obchodní podmínky jsou nedostatečné a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.trackey', 
//  description: 'Jako provozovatel webu není uveden nikdo, chybí zcela kontaktní údaje prodávajícícho, stránky jsou tedy anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Spotřebitel také není řádně informován o právech z vadného plnění a o právu na odstoupení od smlouvy. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pkstudio-dobris', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kubasmrz', 
//  description: 'Opuštěnou doménu známého sportovce koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'karsit-garden', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'nikecz', 
//  description: 'Dle podání spotřebitelů se v posledních dnech zobrazují zejména na sociálních sítích výrazné slevy produktů značky Nike. Odkazuje se přitom na stránku www.nikecz.com. Tato stránka (doména nikecz.com) je přitom vytvořena teprve nedávno a byla registrovaná na subjekt v Číně, který nelze ověřit. Stránky nemají v pořádku ani obchodní podmínky, není možné nalézt kontakt na provozovatele. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.silane-guard-official', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Chybí kontaktní údaje (k dispozici je pouze kontaktní formulář), obchodní podmínky zcela chybí, ČOI již varuje před cz.thesilaneguard.com , cz.thesilaneguardlb.com - jedná se o týž princip a výrobek.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.thevarboosterlb', 
//  description: 'Webové stránky slibují naprosto neznámý přípravek na křečové žíly. Na stránky jsou spotřebitelé odkazováni ve spamech, které chodí do elektronické pošty. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Web je anonymní, jen v zápatí je uvedeno, že se jedná o subjekt z Panamy. Výrobek zcela neznámý. Na stránkách navíc probíhá odpočítávání času jako nátlak na spotřebitele. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pandoracz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Po zaplacení bylo spotřebiteli doručeno poškozené zboží, které nebylo možné reklamovat. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bauer-bandage', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'msfplzen', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kockafe', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'msomska', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cruplex', 
//  description: 'Podle spotřebitelských informací vyžadována platba předem, místo bot dorazila šála mnohem menší hodnoty. Na vrácení zboží do 14 dnů bez udání důvodu nikdo nereaguje. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'registr-dluzniku-k-nahlednuti-zdarma', 
//  description: 'Jiná mutace stránky www.centralniregistrdluzniku.cz (viz níže). Česká obchodní inspekce před jednáním této společnosti dlouhodobě varuje, pokuty uložené ze strany ČOI nejsou uhrazeny, k nápravě jednání nedošlo. Ani na výzvy Úřadu pro ochranu osobních údajů společnost nereaguje a dopouští se nadále protiprávního jednání. Viz https://www.uoou.cz/k-nbsp-zaverum-z-nbsp-kontroly-systemu-centralniho-registru-dluzniku-ceske-republiky-cerd/d-34574. Problém s tímto webem mají spotřebitelé již zhruba 10 let, viz reportáž ČT https://www.ceskatelevize.cz/porady/1142743803-reporteri-ct/210452801240048/0/43914-registr-dluzniku-poskozuje-bezuhonne/', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cerd', 
//  description: 'Jiná mutace stránky www.centralniregistrdluzniku.cz (viz níže). Česká obchodní inspekce před jednáním této společnosti dlouhodobě varuje, pokuty uložené ze strany ČOI nejsou uhrazeny, k nápravě jednání nedošlo. Ani na výzvy Úřadu pro ochranu osobních údajů společnost nereaguje a dopouští se nadále protiprávního jednání. Viz https://www.uoou.cz/k-nbsp-zaverum-z-nbsp-kontroly-systemu-centralniho-registru-dluzniku-ceske-republiky-cerd/d-34574. Problém s tímto webem mají spotřebitelé již zhruba 10 let, viz reportáž ČT https://www.ceskatelevize.cz/porady/1142743803-reporteri-ct/210452801240048/0/43914-registr-dluzniku-poskozuje-bezuhonne/', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'centralniregistrdluzniku', 
//  description: 'Podle spotřebitelů, kteří si u ČOI na Centrální registr dlužníků stěžují, je po registraci problematické provozovatele kontaktovat a ukončit předplatné a každý měsíc jsou strhávány další poplatky ze strany provozovatele webu, aniž by si to spotřebitel přál. Pomocí dokladu z těchto stránek má spotřebitel zjistit, zda je v registru evidován jeho dluh vůči bankám, obchodním společnostem, úvěrovým a leasingovým společnostem nebo státní instituci, banky i úvěrové společnosti se však od činnosti CERD distancují (https://www.cbcb.cz/cerd/) a uvádějí, že pro ně tento doklad není relevantní. Úřad na ochranu osobních údajů v polovině roku 2018 ukončil kontrolu systému Centrálního registru dužníků. Následně na základě kontrolních závěrů zahájil řízení o přijetí nápravných opatření. Správce osobních údajů systému registru dlužníků však uložená opatření neprovedl. Úřad se proto obrátil na poskytovatele služeb pro systém CERD, díky čemuž se podařilo znepřístupnit jeho webové stránky. Tento úspěch byl pouze dílčí, neboť si správce osobních údajů systému CERD zajistil nového poskytovatele služeb. Tím je indická společnost, která IP adresy pro systém CERD hostuje na území Ruské federativní republiky. Úřad tak fakticky přišel o možnost ovlivnit stažení nebo znepřístupnění protiprávního obsahu. Dále pokuta pravomocně uložena Českou obchodní inspekcí nebyla uhrazena, firma se dál dopouští protiprávního jednání. Z výše uvedených důvodů považuje úřad stránky za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hospudkaumiladky', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'addh', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'aqua-mare', 
//  description: 'Podle spotřebitelských informací vyžadována platba předem, místo bot dorazila šála mnohem menší hodnoty. Na vrácení zboží do 14 dnů bez udání důvodu nikdo nereaguje.Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'aaa-sport', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'premium-perfume', 
//  description: 'Podle podání spotřebitelů po objednávce dorazí zřejmě padělky, na odstoupení od kupní smlouvy do 14 dnů bez udání důvodu nikdo nereaguje. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mitcinemitpenize', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především obuv. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'veryvoga', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'airlevne', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především obuv. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bozi-aukce', 
//  description: 'Dle informací od spotřebitelů i po zaplacení určitých částek se k vítězné sumě spotřebitel nedostane, aby výrobek získal. Web je velmi nedůvěryhodný a hlavně anonymní. Z webových stránek není zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky hovoří o provozovateli jménem Jaroslav Hruška, těch je však v ČR hned několik stovek, žádné IČO uvedeno není, zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz-tonic.forhealth', 
//  description: 'Stránky se prezentují jako seriozní portál nabízející neznámý přípravek, který údajně dle informací na webu "snižuje riziko infarktu a mrtvice na nulu". Tento přípravek však není registrován u Státního ústavu pro kontrolu léčiv. Ve skutečnosti recenze na stránkách jsou smyšlené (vzhledem k jiným recenzím na obdobným stránkám a přitom stejným obrázkům u osob, avšak uváděná jiná jména). Obchodní podmínky zcela chybí, provozovatel stránek je anonymní. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'todayofferhub', 
//  description: 'Stránky se prezentují jako Central Slimming Institute, avšak nejde o žádný oficiální portál skutečného "hubnoucího" institutu. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na hubnutí. Fotka uvedená na stránkách, kde je uveden odborník údajně prof. Bruno Matěják, avšak tento domnělý vědec nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu. Fotka údajně spokojených zákazníků je stažena z fotobanky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bioveliss-tabs', 
//  description: 'Web je anonymní. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na hubnutí. Stránky odkazují na úplně stejného prodejce, jako níže uvedený údajně "lékařský portál", který podobným způsobem nabízí celou řadu dalších anonymních přípravků, například přípravek na klouby, na plísně atd. Fotka údajně spokojených zákazníků je stažena z fotobanky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tomashrma', 
//  description: 'Opuštěná dříve fungující doména byla obsazena novým vlastníkem, který je anonymní. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'festivalmezikopci', 
//  description: 'Opuštěná dříve fungující doména byla obsazena novým vlastníkem, který je anonymní. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bestofferintheworld', 
//  description: 'Stránky se prezentují jako Český lékařský portál, avšak nejde o žádný oficiální portál skutečných lékařů. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na hubnutí. Stránky jsou úplně stejné, jako jiný obdobný "lékařský portál", který podobným způsobem nabízí přípravek na klouby. Fotka údajného lékaře uvedená na stránkách v pravém rohu nahoře, je dle jiného podobného portálu Prof. Jaromir Kosinský (odborník), ten však neexistuje. Fotka údajně spokojených zákazníků je stažena z fotobanky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kominyreindl', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'prizniveparfemy', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Podle podání spotřebitelů dorazí výrobek jiné kvality, právo na odstoupení od kupní smlouvy do 14 dnů bez udání důvodu je spotřebiteli dle informací zákazníků odepíráno. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'prodejsvepomoci', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'srpenec', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vogueangle', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'upominkaonline', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Pokud jsou nějaké informace pro spotřebitele poskytnuty, pak výhradně v angličtině. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'ameterapart', 
//  description: 'Stránky se prezentují jako Central Rheumatology Institute, avšak nejde o žádný oficiální portál skutečného revmatologického institutu. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na klouby. Fotka uvedená na stránkách, kde je uveden odborník údajně nominován na Nobelovu cenu prof. Marek Pytlákt, avšak tento domnělý vědec nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu, ani není nominován na Nobelovu cenu. Fotka údajně spokojených zákazníků je stažena z fotobanky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'perfumesonsale', 
//  description: 'Podle spotřebitelských informací po objednání výrobku je vyžadována platba předem, banka eviduje platbu odeslanou do Číny a stržena je vyšší částka. Následně přijde zboží jiné než očekávané kvality, patrně se jedná dokonce o padělek. Nikde se na stránkách není uvedeno, že se jedná o neoriginální výrobky. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'dis2012', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek pro lidské zdraví. Lékaři před tímto výrobkem spotřebitele varují. Kontaktem na webu je výhradně formulář a opět tel. číslo +420 234102147, které se objevuje u celé řady rizikových e-shopů, viz níže. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'schwabess', 
//  description: 'Doména je zneužívaná v rámci spamů, kde do e-mailu přichází informace o tom, že máte od vaší banky důležitou zprávu a je nutné navštívit stránky banky. Jedná se však o fiktivní zprávu a stránky pak mají za cíl vylákat z vás citlivé údaje. Česká obchodní inspekce před těmito stránkami důrazně varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'diabetodofficial', 
//  description: 'Stránky se prezentují jako seriozní portál pro diabetiky nabízející neznámý přípravek. Ten však není registrován u Státního ústavu pro kontrolu léčiv. Ve skutečnosti recenze na stránkách jsou smyšlené (vzhledem k jiným recenzím na obdobným stránkám a přitom stejným obrázkům u osob, avšak uváděná jiná jména). Obchodní podmínky zcela chybí, provozovatel stránek je anonymní. Na stránkách je pak nabízen neznámý přípravek proti plísním. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'discountcbdshop', 
//  description: 'Na webových stránkách jsou nabízeny naprosto neznámý výrobky proti různým zdravotním potížím. Výrobky nejsou registrovány u Státního ústavu pro kontrolu léčiv. Obchodní podmínky chybí, kontaktem na webu je výhradně formulář. Prodejce ze zahraničí cílí i na české spotřebitele a rozesílá nevyžádané e-maily. Spotřebitel je tedy na tyto stránky odkazován ve spamech, které se šíří elektronickou poštou. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tempotime', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'paskycrest', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'moresudoku', 
//  description: 'Opuštěná dříve fungující doména byla obsazena novým prodávajícím. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'theminimalistgirl', 
//  description: 'Opuštěná dříve fungující doména byla obsazena novým prodávajícím. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zoufalemaminky', 
//  description: 'Opuštěná dříve fungující doména byla obsazena novým prodávajícím. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'stylstudiobeata', 
//  description: 'Opuštěná dříve fungující doména byla obsazena novým prodávajícím. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bull-cervinka', 
//  description: 'Opuštěná dříve fungující doména byla obsazena novým prodávajícím. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'slevyapoukazy', 
//  description: 'Opuštěná dříve fungující doména byla obsazena novým prodávajícím. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fotbalsokoldedice', 
//  description: 'Opuštěná dříve fungující doména byla obsazena novým prodávajícím. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hovorysguruem', 
//  description: 'Opuštěná dříve fungující doména byla obsazena novým prodávajícím. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vematex', 
//  description: 'Opuštěná dříve fungující doména byla obsazena novým prodávajícím. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hasiciobora', 
//  description: 'Opuštěná dříve fungující doména byla obsazena novým prodávajícím. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fiatyoungtimer', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'barviruvdum', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'dobra-kamna', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především obuv. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'countryruksak', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'speedminton-brno', 
//  description: 'Internetový obchod nabízející dámskou a pánskou obuv je zcela anonymní. Vyžadována je výhradně platba kartou předem. Dle registru domén nic.cz je držitelem domény subjekt Ute Neustadt, sídlem / bytem Marseiller Strasse 45, 867 39 Ederheim, SRN. Adresa je však smyšlená. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kampan1ku1', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'novyles', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'raddimm', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'evizita', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.thefitospraylb', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pojisteni-hypoteka-investice', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'dsfel', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'auralplussachets', 
//  description: 'Státní ústav pro kontrolu léčiv varuje před nákupem produktů z těchto webových stránek. Na stránkách je nabízen nelegálně například přípravek AuralPlus, viz: http://www.sukl.cz/leciva/webove-stranky-s-nelegalnimi-nabidkami-leciv a Česká obchodní inspekce na základě informací Státního ústavu pro kontrolu léčiv před těmito stránkami varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fungalor', 
//  description: 'Státní ústav pro kontrolu léčiv varuje před nákupem produktů z těchto webových stránek. Na stránkách je nabízen nelegálně například Fungalor, viz: http://www.sukl.cz/leciva/webove-stranky-s-nelegalnimi-nabidkami-leciv a Česká obchodní inspekce na základě informací Státního ústavu pro kontrolu léčiv před těmito stránkami varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'official-fungonis', 
//  description: 'Státní ústav pro kontrolu léčiv varuje před nákupem produktů z těchto webových stránek. Na stránkách je nabízen nelegálně například přípravek Fungonis, viz: http://www.sukl.cz/leciva/webove-stranky-s-nelegalnimi-nabidkami-leciv a Česká obchodní inspekce na základě informací Státního ústavu pro kontrolu léčiv před těmito stránkami varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'psorilin-official', 
//  description: 'Státní ústav pro kontrolu léčiv varuje před nákupem produktů z těchto webových stránek. Na stránkách je nabízen nelegálně například přípravek Psorilin, viz: http://www.sukl.cz/leciva/webove-stranky-s-nelegalnimi-nabidkami-leciv a Česká obchodní inspekce na základě informací Státního ústavu pro kontrolu léčiv před těmito stránkami varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.detoxifypromo', 
//  description: 'Na stránkách je nabízen zcela neznámý přípravek proti plísním. Výrobek na stránkách doporučuje muž, který je popisován jako Dr. Brown, hlavní dermatolog z kliniky "Eitermed", avšak taková instituce není vůbec k dohledání. Obchodní podmínky zde jsou nedostatečné, provozovatel stránek je anonymní. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.myhealthyblog', 
//  description: 'Stránky se prezentují jako seriozní portál radící s léčbami plísní. Ve skutečnosti ale recenze jsou smyšlené (vzhledem k jiným recenzím na obdobným stránkám a přitom stejným obrázkům u osob, avšak uváděná jiná jména). Obchodní podmínky zcela chybí, provozovatel stránek je anonymní. Na stránkách je pak nabízen neznámý přípravek proti plísním. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'czechopen2012', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'thaj-kos', 
//  description: 'Podle spotřebitelských informací po uhrazeníza zboží prodávající nedodal zboží, nereaguje na zprávy a telefon mají vypnutý. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'partapytel', 
//  description: 'Podle spotřebitelských informací po objednání a zaplacení za čas nedorazí objednaná značková obuv, dodáno je zboží výrazně nižší kvality, patrně padělky. Na stránkách nejsou uvedeny žádné identifikační údaje prodávajícího, chybí obchodní podmínky, na reklamace nikdo nereaguje. Z výše uvedených důvodů hodnotí ČOI web jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zelezneazlate', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'adelajonasova', 
//  description: 'Opuštěná dříve fungující doména byla obsazena novým prodávajícím. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'eugenibernad', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'otraveniprazane', 
//  description: 'Opuštěná dříve fungující doména byla obsazena novým majitelem. Web nyní nabízí především obuv, na stránách je velmi špatná strojová čeština, například: "Používáme různé metody porodu, protože taková aplikace různých metod vhodných pro různé země a regiony je schopen udělat čas přepravy co možná nejkratší as, a také zajišťuje bezpečnost a pohodlí přepravy." Zboží je až podezřele levné. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'visitbargainsite', 
//  description: 'Stránky se prezentují jako Český lékařský portál, avšak nejde o žádný oficiální portál skutečných lékařů. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na klouby. Fotka uvedená na stránkách, je dle jiného podobného portálu Prof. Jaromir Kosinský (odborník), ten však neexistuje. Na webu je pak prezentování prof. Ondřej Burkot, avšak tento domnělý vědec nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu apod. Fotka údajně spokojených zákazníků je stažena z fotobanky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mrflinke-cz', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fastphrases', 
//  description: 'Stránky nabízejí neznámý výrobek k tomu, aby se spotřebitel naučil za 30 dní cizí řeč. Výrobek je zcela neznámý. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Před opuštěním stránky se místo uzavření prohlížeče objeví další nabídka a spotřebitel je přesvědčován k nákupu opakovaně. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'sciencejournal', 
//  description: 'Stránky se prezentují jako vědecký portál, avšak nejde o žádný oficiální portál skutečných vědců. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na přiložení k hlavě, který má spotřebitele naučit snadno cizímu jazyku. Výrobek je neznámý, výrobce také a vlastnosti značně pochybné. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'rocktime', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'libereckybeh', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Dle informací od spotřebitelů objednané a zaplacené zboží nebylo doručeno ani po roce. Na dotazy vznesené přes formulář na stránkách nikdo nereaguje. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mylano', 
//  description: 'Obchod zasílá nevyžádané zásilky na základě fiktivních objednávek a první vnucuje spotřebiteli zdarma či za cenu poštovného, aby se spotřebitel zavázal k pravidelnému odběru, ze kterého je pak složitější vystoupit. Na stránkách jsou nedostatečné informace o uplatnění spotřebitelských práv, obchodní podmínky jsou zcela nedostatečné. Před stránkami Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'planters', 
//  description: 'Dle informací od spotřebitele po úhradě předem za značkové boty v ceně 2084 Kč bylo z účtu odečteno mohem více peněz,konkrétně 2600 Kč. Následně místo značkových bot byly doručeny boty výrazně nižší kvality, patrně padělky. Na stránkách nejsou uvedeny žádné identifikační údaje prodávajícího, chybí obchodní podmínky, na reklamace nikdo nereaguje. Z výše uvedených důvodů hodnotí ČOI web jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'dvesrdcelasky', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mjandova', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt, nabízí na stránkách především oblečení a obuv. Název domény neodpovídá nabízenému zboží, tím je především obuv. Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Podle informací od spotřebitele po uhrazení částky z karty stržena suma mnohem vyšší, zboží nepřichází. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'villasalzer', 
//  description: 'Dle informací od spotřebitelů objednané a zaplacené zboží nebylo doručeno. Pravděpodobně došlo ke zneužití údajů jiného prodejce. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cs.oiltherapynow', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Stránky se prezentují jako lékařský portál, avšak nejde o žádný oficiální portál skutečných lékařů. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný přípravek na zlepšení sluchu. Lékaři před tímto neznámým výrobkem spotřebitele varují. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'wincleanerpro', 
//  description: 'Dle spotřebitelský informací po objednávce nedorazilo slibované zboží. Na urgence nikdo nereaguje. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'restauracenabrehu', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt. Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Dle informací od spotřebitelů objednané a zaplacené zboží nebylo doručeno ani po roce. Na dotazy vznesené přes formulář na stránkách nikdo nereaguje. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'worldocassions', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Stránky nabízejí zcela neznámý výrobek na hubnutí. Obchodní podmínky jsou zcela nedostatečné. Prof. Marek A. Štěpán, údajný odborník uvedený na stránkách, který má být specialista v oblasti molekulární biologie a má mít i několik ocenění, neexistuje. Tento domnělý vědec nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu apod. Lékaři před tímto výrobkem spotřebitele varují. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cs-new.lowcaloriesmart', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Stránky se prezentují jako lékařský portál, avšak nejde o žádný oficiální portál skutečných lékařů. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na hubnutí. Fotka uvedená na stránkách, je dle jiného podobného portálu Prof. Jaromir Kosinský (odborník), ten však neexistuje. Tento domnělý vědec nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu apod. Lékaři před tímto výrobkem spotřebitele varují. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'uspory', 
//  description: 'Obdoba vakce.net, již publikováno níže.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pcserviskladno', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především obuv. Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'voucher', 
//  description: 'Dle informací od spotřebitelů objednané a zaplacené zboží nebylo doručeno. Pravděpodobně došlo ke zneužití údajů jiného prodejce. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zahrada-sazenice', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především obuv. Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Podle spotřebitelských informací po objednání a zaplacení za čas nedorazí objednaná značková obuv, dodáno je zboží výrazně nižší kvality, patrně padělky. Na stránkách nejsou uvedeny žádné identifikační údaje prodávajícího, chybí obchodní podmínky, na reklamace nikdo nereaguje. Z výše uvedených důvodů hodnotí ČOI web jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'crafftcon', 
//  description: 'Podle spotřebitelských informací po objednání a zaplacení za čas nedorazí objednaná značková obuv, dodáno je zboží výrazně nižší kvality, patrně padělky. Na stránkách nejsou uvedeny žádné identifikační údaje prodávajícího, chybí obchodní podmínky, na reklamace nikdo nereaguje. Z výše uvedených důvodů hodnotí ČOI web jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mercastory', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'siderogames', 
//  description: 'Opuštěná doména, která původně sloužila k jinému účelu. Na webu je nabídka obuvi. Ceny jsou výrazně nižší, než je běžné. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'aknelmka', 
//  description: 'Dle podání spotřebitelů na webových stránkách po objednání kabelky za u 1142 Kč, byla z karty byla stažena částka 1552 Kč. Dále s požadavky na uhrazení cla se částka vyšplhala na 2099 Kč. Po dvou měsících dorazila místo kabelky peněženka. Na požadavky na reklamaci nikdo nereaguje. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'marthistore', 
//  description: 'Na stránkách je nabídka obuvi a oblečení. Po požadavku uhradit zboží předem kartou dle podání spotřebitele je stžena vyšší částka a spotřebitel také čeká na zboží zatím marně. Jako provozovatel není uveden také nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'scientificnewsforyou', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Stránky se prezentují jako lékařský portál, avšak nejde o žádný oficiální portál skutečných lékařů. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na zlepšení sluchu. Prof. Jaromir Kosinský (odborník pro molekulární biologii), který výrobek prezentuje, neexistuje. Tento domnělý vědec nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu apod. Lékaři před tímto výrobkem spotřebitele varují. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'shopcpagetti3', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý přípravek proti bolestem zad a kloubů. Další informace na stránkách jsou zcela nedostatečné. Jako provozovatel je uvedena údajně firma, která figuruje u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Lékař, který přípravek na stránkách propaguje, je smyšlený a jeho fotografie stažena z fotobanky. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'peha-studio', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt, nabízí na stránkách především oblečení a obuv. Název domény neodpovídá nabízenému zboží, tím je především obuv. Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'potencial50plus', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt, nabízí na stránkách především oblečení a obuv. Podle spotřebitelských informací po zaplacení zboží nikdo nereaguje, zboží nepřichází. Nikde nejsou uvedeny žádné povinné informace o prodávajícím, obchodní podmínky zcela chybí. Před nákupem na těchto stránkách Česká obchodní inspekce spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mksled', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'svet-kamer', 
//  description: 'Stránky nemají žádné obchodní podmínky, není žádný kontakt, jsou zcela anonymní. Místo firmy, která prodávala bio výrobky, jak napovídá název domény, nyní je na webu vystavena obuv a oblečení. Na doménu nás upozornili nejen spotřebitelé, ale i původní vlastník, který doménu neprodloužil. Stránky považuje ČOI za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'dvoucher', 
//  description: 'Dle informací od spotřebitelů objednané a zaplacené zboží nebylo doručeno. pravděpodobně došlo ke zneužití údajů jiného prodejce. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hogenfogen-uklid', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zptoner', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především obuv. Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'olomouckakina', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt, nabízí na stránkách především oblečení a obuv. Název domény neodpovídá nabízenému zboží, tím je především obuv. Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lekarna-tesin', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především obuv. Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bonechi', 
//  description: 'Dle spotřebitelský informací po objednávce dorazilo úplně jiné zboží nižší hodnoty. Na urgence nikdo nereaguje. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tibushop', 
//  description: 'Obchodní podmínky v češtině zcela chybí, další informace na stránkách jsou nedostatečné. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'duveryhodnyobchodnik', 
//  description: 'Opuštěnou doménu koupil neznámý subjekt, nabízí na stránkách především oblečení a obuv. Podle spotřebitelských informací po zaplacení zboží nikdo nereaguje, zboží nepřichází. Ačkoli doména nese název "důvěryhodný obchodník", nikde nejsou uvedeny žádné povinné informace o prodávajícím, obchodní podmínky zcela chybí. Před nákupem na těchto stránkách Česká obchodní inspekce spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tidatours', 
//  description: 'Podle spotřebitelských informací po objednání a zaplacení za čas nedorazí objednaná značková obuv, dodáno je zboží výrazně nižší kvality, patrně padělky. Na stránkách nejsou uvedeny žádné identifikační údaje prodávajícího, chybí obchodní podmínky, na reklamace nikdo nereaguje. Z výše uvedených důvodů hodnotí ČOI web jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'shockingdiscover', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na zlepšení sluchu. Lékaři před tímto výrobkem spotřebitele varují. Kontaktem na webu je výhradně formulář a opět tel. číslo +420 234102147, které se objevuje u celé řady rizikových e-shopů, viz níže. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.thevalgosockslb', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Na stránkách je pak nabízen pochybný výrobek s údajně zázračnou schopností léčby vbočeného palce. Kontaktem je výhradně formulář. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.thevalguspluslb', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Na stránkách je pak nabízen pochybný výrobek s údajně zázračnou schopností léčby vbočeného palce. Kontaktem je výhradně formulář. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'simplyacro', 
//  description: 'Jako provozovatel není uveden také nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'asicsboty', 
//  description: 'Dle spotřebitelský informací po objednávce dorazilo úplně jiné zboží nižší hodnoty. Na urgence nikdo nereaguje. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kozni-keclikova', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval neznámý subjekt. Na stránkách je nabídka oblečení a obuvi. Po požadavku uhradit zboží předem kartou dle podání spotřebitele po zpalacení (částka činila 1650 Kč) žádné zboží nedorazí. Jako provozovatel není uveden také nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'akce-pandora', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'jjshouse', 
//  description: 'Tyto stránky se prezentují pod neexistujícími názvy společností s.r.o., a to současně těmito: READMOB LIMITED s.r.o., ReadMob s.r.o., společnost JJshose.cz a žádnou z těchto společností není možné dohledat ani ve veřejných rejstřících firem. E-shop neuvádí IČO, žádnou adresu sídla, ani telefonický kontakt. Spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vervaracing', 
//  description: 'Na stránkách je nabídka obuvi, kabelek a oblečení. Po požadavku uhradit zboží předem kartou dle podání spotřebitele po zpalacení žádné zboží nedorazí. Jako provozovatel není uveden také nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'offroadales', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval neznámý subjekt. Na stránkách je nabídka oblečení a obuvi. Po požadavku uhradit zboží předem kartou dle podání spotřebitele po zpalacení žádné zboží nedorazí. Jako provozovatel není uveden také nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'daverma', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'sasorirestaurant', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především obuv. Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'led-nakup-sk', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Spokojení zákazníci jsou smyšlení, protože pod fotkami všech údajně spokojených zákazníků jsou uvedena jiná jména (avšak stejné fotky), než ve české podobě stejného webu, tedy porovnáním led-nakup-cz.com a led-nakup-sk.com lehce zjistíme, že jde o smyšlené recenze spokojených zákazníků. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'led-nakup-cz', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Spokojení zákazníci jsou smyšlení, protože pod fotkami všech údajně spokojených zákazníků jsou uvedena jiná jména (avšak stejné fotky), než ve slovenské podobě stejného webu, tedy porovnáním led-nakup-cz.com a led-nakup-sk.com lehce zjistíme, že jde o smyšlené recenze spokojených zákazníků. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'denta-seal', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.theerofertillb', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji přes reklamu, slibují neznámý přípravek na rychlou erekci. Informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena údajně firma z Panamy, která figuruje u mnoha jiných rizikových e-shopů, které nabízejí celou řadu dalších neznámých výrobků např. na hubnutí, proti kouření, prostatě, na klouby, srdeční hypertenzi a další. Výrobky nejsou schváleny Ústavem pro kontrolu léčiv, lékaři před těmito neznámými přípravky varují. Nákup zde za rizikový považuje také Česká obchodní inspekce.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'ceskylekarskyportal', 
//  description: 'Stránky se prezentují jako lékařský portál, avšak nejde o žádný oficiální portál skutečných lékařů. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen naprosto neznámý výrobek. Lékaři před tímto výrobkem spotřebitele varují. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'eccoeshop', 
//  description: 'Na webu je nabízena především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'stavimezavas', 
//  description: 'Název domény neodpovídá nabízenemu zboží, tím je především oblečení. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'rerez', 
//  description: 'Na webu je především oblečení. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'poodle-rebels', 
//  description: 'Na webu je především oblečení. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'dc-pump', 
//  description: 'Na webu je především oblečení. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'restaurantdobrecasy', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hbc-finance', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především obuv. Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'prahapoint', 
//  description: 'Na webu je nabízena především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pennysklenice', 
//  description: 'Spotřebitelka si objednala a zaplatila předem za zboží uvedené na stránkách, žádné zboží však nepřišlo. Ačkoli doména nese název o "sklenice", nejedná se o nabídku sklenic, ale oblečení a obuvi. Stránky využívají doménu, která může připomínat obchodní řetězec, avšak nemají s ním nic společného dle informací registrátora domén. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'limeline', 
//  description: 'Na webu je nabízena především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'prozakladky', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'newsroom365', 
//  description: 'Webové stránky slibují naprosto neznámý přípravek na růst svalů a mladistvý vzhled. Na stránky jsou spotřebitelé odkazováni v reklamách. Výrobek je však zcela neznámý a mohl by mít i negativní vliv na lidské zdraví. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cs.detectingvibrations', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Stránky se prezentují jako lékařský portál, avšak nejde o žádný oficiální portál skutečných lékařů. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na zlepšení sluchu. Prof. Jaromir Kosinský (odborník pro molekulární biologii), který výrobek prezentuje, neexistuje. Tento domnělý vědec nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu apod. Lékaři před tímto výrobkem spotřebitele varují. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kvh-schneeberg', 
//  description: 'Na webu je nabízena především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.mydiettonuslb', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý přípravek na rychlé zhubnutí. Obchodní podmínky v češtině zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena údajně firma z Panamy uvedena u celé řady dalších rizikových webů. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'marketabrancikova', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'jordantenisky', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'chinaexpress', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pizzeriechlummost', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především obuv. Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'aa-luxusnidorty', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především obuv. Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kokonuisk', 
//  description: 'Dle spotřebitelský informací po objednávce dorazilo úplně jiné zboží nižší hodnoty. Na urgence nikdo nereaguje. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'stormbuck', 
//  description: 'Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Nabízena je především obuv za výrazně nžší ceny ve srovnání s ostatními weby. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cs.myhearingloss', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na zlepšení sluchu. Prof. Jaromir Kosinský (odborník pro molekulární biologii), který výrobek prezentuje, neexistuje. Tento domnělý vědec nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu apod. Lékaři před tímto výrobkem spotřebitele varují. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'collistars', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji přes reklamu, slibují neznámý přípravek pro delší pohlavní styk. Informace na stránkách jsou nedostatečné. Na webových stránkách je nabízen naprosto neznámý výrobek proti potížím s klouby, který není registrovaný u Státního ústavu pro kontrolu léčiv. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hansryska', 
//  description: 'Na webu je nabízena především obuv. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'strakaastraka', 
//  description: 'Na webu je nabízena především obuv. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'iwwasap', 
//  description: 'Na webu je nabízena především obuv. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'yourmarket24', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na zlepšení sluchu. Prof. Jaromir Kosinský (odborník pro molekulární biologii), který výrobek prezentuje, neexistuje. Tento domnělý vědec nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu apod. Lékaři před tímto výrobkem spotřebitele varují. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'healthinfo7', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na zlepšení sluchu. Prof. Jaromir Kosinský, který výrobek prezentuje, neexistuje. Tento domnělý vědec nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu apod. Lékaři před tímto výrobkem spotřebitele varují. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bzsas', 
//  description: 'Na stránkách jsou prodávány kšiltovky a další oblečení. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'adapterynotebooku', 
//  description: 'Dle spotřebitele je zboží z tohoto e-shopu nefunkční. Spotřebitel je krácen na svých právech, protože v obchodních podmínkách je stanoveno, že zboží musí být reklamováno do 30 dnů od doručení. Na kontakt uvedený na stránkách obchodu nikdo nereaguje. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tspweb', 
//  description: 'Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'salondibo', 
//  description: 'Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cpagetti3', 
//  description: 'Na webových stránkách je nabízen naprosto neznámý výrobek proti potížím s klouby, který není registrovaný u Státního ústavu pro kontrolu léčiv. Jako prodejce je uvedena firma z Panamy, která se objevuje u celé řady rizikových e-shopů, viz níže. Kontaktem na webu je výhradně formulář a opět tel. číslo +420 234102147, které se také objevuje u celé řady rizikových e-shopů. Spotřebitel je na tyto stránky odkazován ve spamech, které se šíří elektronickou poštou. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.thenicoinlb', 
//  description: 'Webové stránky slibují naprosto neznámý přípravek proti kouření. Na stránky jsou spotřebitelé odkazováni ve spamech, které chodí do elektronické pošty. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Web je anonymní, výrobek zcela neznámý a mohl by mít i negativní vliv na lidské zdraví. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.theprosterolb', 
//  description: 'Webové stránky slibují naprosto neznámý přípravek proti prostatě. Na stránky jsou spotřebitelé odkazováni ve spamech, které chodí do elektronické pošty. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Na stránkách je údajný názor odborníka, jeho jméno však chybí, fotka je stažena z fotobanky. Web je anonymní, výrobek zcela neznámý a mohl by mít i negativní vliv na lidské zdraví. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'salescz', 
//  description: 'Stránka funguje jen v případě, kdy se Vám otevře sama například přes proklik při kliknutí na spam. Stránka vzbuzuje dojem, že jste byli vybraným uživatelem k odměně od T-Mobile, avšak jedná se o podvod. Zřejmě bude smyslem stránky sbírat Vaše osobní údaje. Stránky jsou také v češtině. Stránka nepatří společnosti T-Mobile, nemá s ní nic společného a proto Česká obchodní inspekce před tímto webem varuje. Důrazně doporučuje formulář k údajné výhře nevyplňovat.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pro-kraj', 
//  description: 'Na webu je nabízena především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'marleybox', 
//  description: 'Na webu je nabízena především obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: '99shopzone', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí. Na stránkách je pak nabízen pochybný výrobek proti papalomaviru a bradavicím. Dr. Karel Novotný, který výrobek prezentuje, má fotku staženou z fotobanky, na visačce je přitom jiné jméno. Tento domnělý vědec nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu apod. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: '101offers', 
//  description: 'Na webu je nabízen údajně „zázračný“ přístroj na úsporu paliva a efektivnost motoru. Na stránkách je postupně odečítán počet kusů s cílem vytvořit nátlak na spotřebitele k rychlému nákupu. Ani není zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Na stránkách je pouze kontaktní formulář a telefonní číslo, které je u mnoha dalších rizikových webů. Fotky údajně spokojených uživatelů jsou použity i na jiných podobných webech, avšak jsou u nich jiná jména osob. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'veronikafenclova', 
//  description: 'Na webu je nabízeno především oblečení. Po zaplacení a po delší době místo svetru bezcenný balíček z Číny. Na výzvy k uplatnění nároku na vrácení do 14 dnů bez udání důvodu nikdo nereaguje. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'rktv', 
//  description: 'Na webu je nabízena především obuv. Podle spotřebitelských informací po zaplacení kartou je stržena mnohem vyšší částka, než je uvedeno u zboží. Po zaplacení a po delší době místo dražších značkových bot dorazil bezcenný balíček z Číny. Na výzvy k uplatnění nároku na vrácení do 14 dnů bez udání důvodu nikdo nereaguje. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'klumparzdenek', 
//  description: 'Na webu je nabízena především obuv. Podle spotřebitelských informací po zaplacení kartou je stržena mnohem vyšší částka, než je uvedeno u zboží. Po zaplacení a po delší době místo dražších značkových bot dorazil bezcenný balíček z Číny. Na výzvy k uplatnění nároku na vrácení do 14 dnů bez udání důvodu nikdo nereaguje. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'thekey-tolife', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují přípravek na rychlé zhubnutí. Obchodní podmínky v češtině zcela chybí, další informace na stránkách jsou nedostatečné. Nabízený přípravek je zcela neznámý. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'dedolej', 
//  description: 'Opuštěná doména byla dříve využívána pro jiné účely. Na stránkách nejsou uvedeny žádné povinné informace o prodávajícím, obchodní podmínky zcela chybí. Podle spotřebitelských informací po zaplacení za zboží nikdo nereaguje, zboží nepřichází. Před nákupem na těchto stránkách Česká obchodní inspekce spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'omegashark', 
//  description: 'Webové stránky slibují naprosto neznámý přípravek proti bolesti. Na stránky jsou spotřebitelé odkazováni ve spamech, které chodí do elektronické pošty. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Podle informací od spotřebitele uplatnit právo na vrácení zboží není umožněno. Web je anonymní, výrobek zcela neznámý a mohl by mít i negativní vliv na lidské zdraví. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lacuketa', 
//  description: 'Opuštěná doména, která původně sloužila k jinému účelu. Ze stránek navíc není zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Na webu je nabízena obuv. Podle informací od spotřebitele byla vyžadována platba předem kartou. Poté však z účtu odešlo o 150 Kč více, než byla uvedená cena zboží. Podle spotřebitelských informací po zaplacení za zboží nikdo nereaguje, zboží nepřichází. Před nákupem na těchto stránkách Česká obchodní inspekce spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'malpro-pawbol', 
//  description: 'Tento e-shop nabízí především obuv a brýle. Chybí jakékoli informace o prodávajícím, také obchodní podmínky. Dle zkušeností spotřebitelů, kteří se obracejí na Českou obchodní inspekci, e-shop po objednávce sice zboží doručí z Číny a úplně jiné, než jaké si spotřebitel objedná. Na následné uplatnění zákonné možnosti vrácení zboží do 14 dnů bez udání důvodu prodejce nereaguje. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.feizer', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'omegasharkofficial', 
//  description: 'Webové stránky slibují naprosto neznámý přípravek na klouby. Na stránky jsou spotřebitelé odkazováni ve spamech, které chodí do elektronické pošty. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Web je anonymní, výrobek zcela neznámý a mohl by mít i negativní vliv na lidské zdraví. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'marousova-kurzy', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím nejsou žádné kurzy, ale především obuv. Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'volanizakacku', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především obuv. Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'schotz', 
//  description: 'Jedná se o e-shop s oblečením, jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cs.antiagingtipsweb', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na zlepšení sluchu. Prof. Jaromir Kosinský (odborník pro molekulární biologii), který výrobek prezentuje, neexistuje. Tento domnělý vědec nemá záznam v žádné seriózní instituci: na univerzitě, v nemocnici, ve specializovaném ústavu apod. Lékaři před tímto výrobkem spotřebitele varují. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'allsearchreward', 
//  description: 'Stránka funguje jen v případě, kdy se Vám otevře sama například přes proklik při kliknutí na spam. Stránka vzbuzuje dojem, že jste byli miliardovým uživatelem Google, který použil vyhledávač, avšak jedná se o podvod. Zřejmě bude smyslem stránky sbírat Vaše osobní údaje. Stránky jsou také v češtině. V zahraničí tímto způsobem lákají data důvěřivých uživatelů již několik měsíců, viz https://www.spam-info.de/9353/die-milliardste-google-suche-achtung-datensammler/ a proto Česká obchodní inspekce před tímto webem varuje. Důrazně doporučuje formulář k údajné výhře nevyplňovat, stránky nepatří společnosti Google.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'machackova-terapie', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Nastránkách je nabídka bot výrazně pod cenou. Za zboží lze platit výhradně předem kartou. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'casopisbohyne', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'malapostovnikancelar', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tip-profit', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'motopenzion', 
//  description: 'Název domény neodpovídá nabízenému zboží. Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Za zboží lze platit výhradně předem kartou. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'flipitreality', 
//  description: 'Podle spotřebitelských informací po objednání a zaplacení za čas nedorazí objednaná značková obuv, dodáno je zboží výrazně nižší kvality (obyčejné boty do vody za pár korun). Na stránkách nejsou uvedeny žádné identifikační údaje prodávajícího, chybí obchodní podmínky, na umožnění vrácení zboží a reklamace nikdo nereaguje. Z výše uvedených důvodů hodnotí ČOI web jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tamtamyops', 
//  description: 'Na Českou obchdní inspekci se obrátil bývalý majitel domény, který se cítí stránkami poškozován. Stránky neprodloužil, zaplatil si je anonymní subjekt, který nabízí především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'sarkazadakova', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Na stránkách je nabízeno především oblečení a obuv. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'klemposerv', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Nastránkách je nabídka bot výrazně pod cenou. Za zboží lze platit výhradně předem kartou. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'baltom', 
//  description: 'Podle spotřebitelských informací po objednání a zaplacení za čas nedorazí objednaná značková obuv, dodáno je zboží výrazně nižší kvality, patrně padělky. Na stránkách nejsou uvedeny žádné identifikační údaje prodávajícího, chybí obchodní podmínky, na reklamace nikdo nereaguje. Z výše uvedených důvodů hodnotí ČOI web jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'brandcode', 
//  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.theelmacholb', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji přes reklamu, slibují neznámý přípravek na rychlou erekci. Informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena údajně firma z Panamy, která figuruje u mnoha jiných rizikových e-shopů. Na stránkách odbíhá odpočítávání kusů, které zbývají, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'milovnikpribehu', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Podle spotřebitelských informací i zde je platba možná jen pomocí platební karty, údaje jsou poptány na vlastním formuláři (není použita žádná důvěryhodná platební brána). Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'horokolo', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Na webu je nabídka obuvi. Podle spotřebitelských informací před zaplacením za zboží je spotřebitel přesměrován na podivnou stránku vyžadující údaje o platební kartě. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cukrarnalaskonka', 
//  description: 'Opuštěná doména, která původně sloužila k jinému účelu. Na webu je nabízena obuv a oblečení. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'satinefashion', 
//  description: 'Podle informací od spotřebitele si web strhl z karty více peněz, než bylo uvedeno. Místo objednaného kvalitního zboží přišel jen hadr, dle spotřebitele. Balíček dorazil z Číny, není možné nikoho kontaktovat. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.theenergysaverboxlb', 
//  description: 'Na těchto stránkách je nabízen prodej zařízení na šetření spotřeby elektrické energie. Toto zařízení však energii nemůže ušetřit, ale naopak ji spotřebovává. Může se navíc jednat o nebezpečný výrobek. V roce 2012 byl do systému RAPEX nahlášen velmi podobný výrobek Power Factor Saver, výrobek představoval nebezpečí úrazu elektrickým proudem, protože napětí na kolících po odpojení výrobku ze zásuvky bylo příliš vysoké. Internetové stránky jsou provozovány zahraničními osobami, které figurují u jiných rizikových webů, sídlo uvádějí v Panamě.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'securesmrt-dt', 
//  description: 'Internetové stránky údajné seznamky, na které se dostanete nejčastěji na základě spamů v elektronické poště, nabízejí mužům hezké slečny, fotky jsou však staženy z fotobank, po zaplacení jste přesměrování na další podobné stránky vyžadující peníze. S ohledem na zcela chybějící informace na webu nejen o provozovateli webu, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce stránky považuje za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bbonita', 
//  description: 'Stránky jsou registrovány na údajný blíže neurčený soud, na webu je uvedeno, že provozovatelé stránek zajišťují bonitu pro celou řadou bank (KB, Fio Banka,...), jde však o lživé údaje. Dle adresy uvedené u národního registrátora domén se jedná o smyšlené údaje o vlastníkovi. Web je navázán na rizikové stránky vakce.net, které lákají na levné zboží. Přestože adresáti těchto zpráv objednávku zboží nedokončí, jsou jim následně z adresy dluznik@bbonita.cz (nebo adresy rozhodnuti@soud-exekuce.cz) zaslány e-maily vyzývající k úhradě objednávky na konkrétní účty nebo k platbě v bitcoinech s tím, že nebude-li uhrazeno, bude provedena exekuce. Následně jsou adresátům těchto e-mailů i zasílány SMS zprávy s textem informujícím o tom, že dnes bude provedena exekuce za asistence policie. Zprávy jsou podepsány za blíže neurčený exekuční úřad. Exekutorská komora ČR zdůrazňuje, že se v žádném případě nejedná o sdělení zasílaná Exekutorskou komorou ČR ani soudními exekutory, kteří takovéto výzvy zásadně nezasílají, a to ani e-mailem ani SMS zprávami. S ohledem na uvedená fakta Česká obchodní inspekce zařazuje tyto stránky také mezi rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.theartrovexlb', 
//  description: 'Webové stránky slibují naprosto neznámý přípravek na klouby. Na stránky jsou spotřebitelé odkazováni ve spamech, které chodí do elektronické pošty. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Web je anonymní, výrobek zcela neznámý a mohl by mít i negativní vliv na lidské zdraví. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'thebitcoincompass', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, nabízejí investování peněz na principu prodeje virtuální měny bitcoin. Samotné investování do kryptoměny však může být i značně prodělečné, již několik měsíců kryptoměny ztrácejí velmi výrazně svoji hodnotu, viz https://coinmarketcap.com. Webové stránky uvádějí lživé a zastaralé informace o investici do kryptoměny bitcoin a prezentují zastaralá data, aby to vypadalo, že investice se jedině vyplatí. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'soud-exekuce', 
//  description: 'Stránky jsou registrovány na údajný blíže neurčený soud, dle adresy uvedené u národního registrátora domén se jedná o smyšlené údaje o vlastníkovi. Po načtení stránky se píše, že web právě synchronizuje údaje ze soudu, což je nesmyslná a zavádějící informace. Web je navázán na rizikové stránky vakce.net, které láká na levné zboží. Přestože adresáti těchto zpráv objednávku zboží nedokončí, jsou jim následně z adresy rozhodnuti@soud-exekuce.cz (nebo adresy dluznik@bbonita.cz) zaslány e-maily vyzývající k úhradě objednávky na konkrétní účty nebo k platbě v bitcoinech s tím, že nebude-li uhrazeno, bude provedena exekuce. Následně jsou adresátům těchto e-mailů i zasílány SMS zprávy s textem informujícím o tom, že dnes bude provedena exekuce za asistence policie. Zprávy jsou podepsány za blíže neurčený exekuční úřad. Exekutorská komora ČR zdůrazňuje, že se v žádném případě nejedná o sdělení zasílaná Exekutorskou komorou ČR ani soudními exekutory, kteří takovéto výzvy zásadně nezasílají, a to ani e-mailem ani SMS zprávami. S ohledem na uvedená fakta Česká obchodní inspekce zařazuje tyto stránky také mezi rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fischervaclav', 
//  description: 'Stránky dnes nabízejí prodej letenek na příští rok 2019 a z webu přitom není nikde zřejmé, kdo je provozovatelem. Podle informací od zákazníka, který chtěl letenku zakoupit, je na jeho bankovním výpisu transakce vedena jako nákup elektroniky v Lucembursku. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva (k dnešnímu dni, tj. 6. prosinec 2018). Česká obchodní inspekce před těmito stránkami spotřebitele proto varuje. Pokud někdo na webu zaplatil převodem kartou, může žádat svoji banku o tzv. chargeback.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fischervaclav', 
//  description: 'Doplnění (dne 10. 12. 2018): Na webu došlo ke změně - není již možné letenky zde zakoupit a na stránkách je prodávající uveden, z tohoto důvodu ČOI vyřazuje tento web z rizikových.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vakce', 
//  description: 'Exekutorská komora ČR varuje veřejnost před novými podvodnými e-mailovými a SMS zprávami, jejichž odesílatelé vyhrožují provedením exekuce. Adresátům byly tyto e-maily doručeny poté, co se pokusili objednat zboží na stránkách www.vakce.net, které lákají na nabídku levného zboží. Přestože adresáti těchto zpráv objednávku zboží nedokončí, jsou jim následně z adresy rozhodnuti@soud-exekuce.cz nebo adresy dluznik@bbonita.cz zaslány e-maily vyzývající k úhradě objednávky na konkrétní účty nebo k platbě v BitCoinech s tím, že nebude-li uhrazeno, bude provedena exekuce. Následně jsou adresátům těchto e-mailů i zasílány SMS zprávy s textem informujícím o tom, že dnes bude provedena exekuce za asistence policie. Zprávy jsou podepsány za blíže neurčený exekuční úřad. Exekutorská komora ČR zdůrazňuje, že se v žádném případě nejedná o sdělení zasílaná Exekutorskou komorou ČR ani soudními exekutory, kteří takovéto výzvy zásadně nezasílají, a to ani e-mailem ani SMS zprávami. S ohledem na uvedená fakta Česká obchodní inspekce zařazuje tyto stránky mezi rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'topslevy', 
//  description: 'Před těmito stránkami Česká obchodní inspekce varuje ve spolupráci s Policií ČR z důvodného podezření na podvodné jednání provozovatele e-shopu.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'podbrezacek', 
//  description: 'Opuštěná doména, která původně sloužila k jinému účelu. Ze stránek navíc není zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Na webu je nabízena obuv. Podle informací od spotřebitele byla vyžadována platba předem kartou. Poté však z účtu odešlo o 150 Kč více, než byla uvedená cena zboží. Podle spotřebitelských informací po zaplacení za zboží nikdo nereaguje, zboží nepřichází. Před nákupem na těchto stránkách Česká obchodní inspekce spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'wshandicap', 
//  description: 'Opuštěná doména, která původně sloužila k jinému účelu. Na webu je nabídka čepic a kšiltovek. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz1.therecardiolb', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt na léčbu srdeční hypertenze. Jedná se však o neznámý přípravek, který má sloužit k léčbě, aniž by byl schválen Státním ústavem pro kontrolu léčiv. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena společnost z Panamy. Na stránkách probíhá odpočítávání času, po který uvedená nabídka platí, avšak časomíra se vrací zpět, jde o nekalou obchodní praktiku a nátlak na spotřebitele, aby nakoupil a neměl čas o nabídce přemýšlet. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pharmworld', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý přípravek na rychlou erekci, který není registrován u Státního ústavu pro kontrolu léčiv. Obchodní podmínky jsou zcela nedostatečné. Jako provozovatel je uvedena údajně zahraniční firma, kterou se dá kontaktovat jedině přes webový formulář na těchto stránkách. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.thealcobarrierlb', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý a údajně zázračný přípravek k vnitřnímu užití, který by vás měl zbavit závislosti na alkoholu. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Na stránkách odbíhá časomíra, podle které nabídka údajně za pár hodin vyprší. Avšak po vynulování časomíry odbíhá nové odpočítávání, jde o nekalou obchodní praktiku. Jako prodejce je uvedena firma z Panamy, která se objevuje u celé řady rizikových e-shopů, viz níže. Spotřebitel je na tyto stránky odkazován ve spamech, které se šíří elektronickou poštou. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'world-of-earnings', 
//  description: 'Stránka fungující opět na stejném principu nabídky virtuální měny TRON, která má za cíl přimět spotřebitele k nákupu této kryptoměny, avšak chybí jakékoli informace o prodejci. Samotné investování do kryptoměny TRON však může být i prodělečné. Jakmile se pokouší návštěvník stránku opustit, vyskočí na něj varování a ještě další údajně výhodnější nabídka. S ohledem na nedostatečné informace na webu nejen o provozovateli, ale i zcela chybějící zákonné informace o právech pro spotřebitele, Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'investment-rules', 
//  description: 'Stránky nabízejí investování peněz na principu prodeje virtuální měny TRON. Samotné investování do kryptoměny TRON však může být i prodělečné, viz https://coinmarketcap.com/currencies/tron/. Jakmile se pokouší návštěvník stránku opustit, vyskočí na něj varování a ještě další údajně výhodnější nabídka. S ohledem na nedostatečné informace na webu nejen o provozovateli, dále neinformování o právech pro spotřebitele, Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.the-titaniumlb', 
//  description: 'Webové stránky slibují naprosto neznámý přípravek na zvětšení mužského přirození. Na stránky jsou spotřebitelé odkazováni ve spamech, které chodí do elektronické pošty. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Web je anonymní, výrobek zcela neznámý a mohl by mít i negativní vliv na lidské zdraví. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'inkup', 
//  description: 'Další internetová aukce postavena na stejném modelu jako předchozí rizikové webové stránky, na které Česká obchodní inspekce eviduje podání. Aukční stránky naplňují znaky rizikových webů. Jako provozovatel je opět uvedena údajná firma ze Seychel: Annaba Consulting Corp., Global Gateway 3039, Rue de la Perle, no Providence, Seychely. S ohledem na stížnosti spotřebitelů na tohoto provozovatele a nedostatečné informace na webu nejen o provozovateli Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kodiaq', 
//  description: 'Další internetová aukce postavena na stejném modelu jako předchozí rizikové webové stránky, na které Česká obchodní inspekce eviduje podání. Aukční stránky naplňují znaky rizikových webů. Jako provozovatel je opět uvedena údajná firma ze Seychel: Annaba Consulting Corp., Global Gateway 3039, Rue de la Perle, no Providence, Seychely. S ohledem na stížnosti spotřebitelů na tohoto provozovatele a nedostatečné informace na webu nejen o provozovateli Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'smaxy', 
//  description: 'Další internetová aukce postavena na stejném modelu jako předchozí rizikové webové stránky, na které Česká obchodní inspekce eviduje podání. Aukční stránky naplňují znaky rizikových webů. Jako provozovatel je opět uvedena údajná firma ze Seychel: Annaba Consulting Corp., Global Gateway 3039, Rue de la Perle, no Providence, Seychely. S ohledem na stížnosti spotřebitelů na tohoto provozovatele a nedostatečné informace na webu nejen o provozovateli Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cosmito', 
//  description: 'Další internetová aukce postavena na stejném modelu jako předchozí rizikové webové stránky, na které Česká obchodní inspekce eviduje podání. Aukční stránky naplňují znaky rizikových webů. Jako provozovatel je opět uvedena údajná firma ze Seychel: Annaba Consulting Corp., Global Gateway 3039, Rue de la Perle, no Providence, Seychely. S ohledem na stížnosti spotřebitelů na tohoto provozovatele a nedostatečné informace na webu nejen o provozovateli Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'inau', 
//  description: 'Podle spotřebitelských informací se na webu nacházejí aukce na drahé zboží, které se podle úvodní stránky zdají velmi výhodné, protože to vypadá, že se drahá elektronika dá pořídit za pár korun. Při reálném pokusu o výhře v anketě a následném nákupu velkého množství kreditů za reálné peníze (v řádu tisíců korun) se nedaří vyhrát v aukci, protože vždy je spotřebitel překonán někým jiným, pro něj neznámým (možná dokonce automatem). Aukce se tak nakonec zdají po praktickém vyzkoušení jako neférové, ani po desetitisícové částce se totiž nepodařilo aukci vyhrát. Stránky naplňují znaky rizikových webů. Jako provozovatel webu není uvedena žádná firma, žádné IČO. Z veřejně dostupné databáze národního registrátora domén je uveden jako vlastník údajná firma ze Seychel: Annaba Consulting Corp., Global Gateway 3039, Rue de la Perle, no Providence, Seychely. S ohledem na stížnosti spotřebitelů a nedostatečné informace na webu nejen o provozovateli Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.thesuganormlb', 
//  description: 'Na webových stránkách je nabízen naprosto neznámý výrobek jako pomoc pacientům při cukrovce, který není registrovaný u Státního ústavu pro kontrolu léčiv. Jako prodejce je uvedena firma z Panamy, která se objevuje u celé řady rizikových e-shopů, viz níže. Spotřebitel je na tyto stránky odkazován ve spamech, které se šíří elektronickou poštou. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pujcovnakaravanupetra', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především obuv. Ceny jsou výrazně nižší, než je běžné. Kontaktní údaje Adress 1 a telefon 123456789 jsou nesmyslné, jedinou možností je platba předem kartou. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'gdgolomouc', 
//  description: 'Opuštěná doména, která původně sloužila k jinému účelu. Na webu je nabídka obuvi. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tomfinreality', 
//  description: 'Opuštěná doména, která původně sloužila k jinému účelu. Na webu je nabídka obuvi. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'johankacieslarova', 
//  description: 'Opuštěná doména, která původně sloužila k jinému účelu. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.artro-vex', 
//  description: 'Na webových stránkách je nabízen naprosto neznámý výrobek proti potížím s klouby, který není registrovaný u Státního ústavu pro kontrolu léčiv. Jako prodejce je uvedena firma z Panamy, která se objevuje u celé řady rizikových e-shopů, viz níže. Kontaktem na webu je výhradně formulář a opět tel. číslo +420 234102147, které se také objevuje u celé řady rizikových e-shopů. Spotřebitel je na tyto stránky odkazován ve spamech, které se šíří elektronickou poštou. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kupparfem', 
//  description: 'Stránky provozuje společnost Global Distribution Solutions LLC se sídlem v USA, na stránkách nejsou řádné informace například o možnosti odstoupení od smlouvy. Podle spotřebitelských informací po objednání a zaplacení za čas nedorazí objednané zboží, dodáno je zboží výrazně nižší kvality, patrně padělky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'luxusniparfemy.ecwid', 
//  description: 'Stránky provozuje společnost Global Distribution Solutions LLC se sídlem v USA, na stránkách nejsou řádné informace například o možnosti odstoupení od smlouvy. Podle spotřebitelských informací po objednání a zaplacení za čas nedorazí objednané zboží, dodáno je zboží výrazně nižší kvality, patrně padělky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'doniksport', 
//  description: 'Na stránkách nejsou uvedeny žádné povinné informace o prodávajícím, obchodní podmínky zcela chybí. Podle spotřebitelských informací po zaplacení za zboží nikdo nereaguje, zboží nepřichází. Před nákupem na těchto stránkách Česká obchodní inspekce spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'onlineslevy', 
//  description: 'Na stránkách nejsou uvedeny žádné povinné informace o prodávajícím, obchodní podmínky zcela chybí. Podle spotřebitelských informací po zaplacení za zboží nikdo nereaguje, zboží nepřichází. Před nákupem na těchto stránkách Česká obchodní inspekce spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'aakce', 
//  description: 'Společnost uvedená na stránkách ve skutečnosti web neprovozuje. Po registraci na stránkách, přičemž nemusí ani dojít k objednávce zboží, chodí spotřebitelům e-maily vyhrožující exekucí. Před těmito e-maily varovala i Exekutorská komora ČR.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zahrady-krolmus', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především oblečení a obuv. Podle spotřebitelských informací po zaplacení zboží nikdo nereaguje, zboží nepřichází. Na stránkách nejsou uvedeny žádné povinné informace o prodávajícím, obchodní podmínky zcela chybí. Před nákupem na těchto stránkách Česká obchodní inspekce spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'filipproucil', 
//  description: 'Podle spotřebitelských informací po objednání výrobku je vyžadována platba předem, banka eviduje platbu odeslanou do Číny a stržena je vyšší částka. Následně přijde zboží jiné než očekávané kvality, patrně se jedná dokonce o padělek. Nikde se na stránkách není uvedeno, že se jedná o neoriginální výrobky. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pureboost', 
//  description: 'Podle spotřebitelských informací je vyžadována platba předem a stržena z účtu vyšší částka, než je uvedena u výrobků. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Poté, co přišlo jiné zboží, než které bylo objednáno, navíc špinavé a bez originální krabice, po pokusech o kontakt není ze strany provozovatele žádné reakce. Jediným kontaktem na prodejce je formulář na webu, na ten však nikdo neodpovídá. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'unitycesky', 
//  description: 'Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'the-best-deal-for-you', 
//  description: 'Stránky přesměrují spotřebitele na web, kde je pak informován, že vyhrál iPhone. Stránky jsou anonymní, spotřebitel je nucen vyplnit e-mail, aniž by mu byly předem poskytnuty bližší informace o pravidlech a provozovateli stránek. Česká obchodní inspekce považuje web za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'whetupartners', 
//  description: 'Společnost Whetu and Partners, která nabízí na internetových stránkách http://www.whetupartners.com/ investiční služby, žádným povolením v České republice nedisponuje. Na web upozorňuje také Česká národní banka, která v této souvislosti varuje, že zákazníci společnosti Whetu and Partners jsou odkazováni na internetové stránky www.feb-gov.org patřící subjektu Foreign Equities Board, který se neoprávněně prezentuje jako orgán dohledu nad finančním trhem v České republice, přičemž na internetových stránkách www.feb-gov.org je pak mimo jiné obsažena nepravdivá informace o tom, že společnost Whetu and Partners má oprávnění k poskytování služeb na finančním trhu. Více informací zde http://www.cnb.cz/cs/spotrebitel/ochrana_spotrebitele/upozorneni/upozorneni_whetu_and_partners.html', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'servistrade', 
//  description: 'Na stránkách nejsou uvedeny žádné povinné informace o prodávajícím, obchodní podmínky zcela chybí. Podle spotřebitelských informací po zaplacení za zboží nikdo nereaguje, zboží nepřichází. Před nákupem na těchto stránkách Česká obchodní inspekce spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'danajaklova', 
//  description: 'Opuštěná doména byla dříve využívána pro jiné účely. Na stránkách nejsou uvedeny žádné povinné informace o prodávajícím, obchodní podmínky zcela chybí. Podle spotřebitelských informací po zaplacení za zboží nikdo nereaguje, zboží nepřichází. Před nákupem na těchto stránkách Česká obchodní inspekce spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'romodis', 
//  description: 'Podle spotřebitelských informací je vyžadována platba předem a stržena z účtu vyšší částka, než je uvedena u výrobků. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Poté, co přišlo úplně jiné zboží, než které bylo objednáno, po pokusech o kontakt začali dle spotřebitelských informací komunikovat v angličtině a bylo sděleno, že se má zákazník jejich chybně odeslané zboží pokusit prodat dál sám, teba přes bazar. Přestože má mít zákazník právo zboží vrátit do 14 dnů bez udání důvodu. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'levnevodnidymky', 
//  description: 'Název webu neodpovídá nabízenému zboží, tím je především oblečení a obuv. Na stránkách nejsou uvedeny žádné identifikační údaje prodávajícího, chybí obchodní podmínky. Z výše uvedených důvodů hodnotí ČOI jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'eufonie', 
//  description: 'Na webu je především oblečení a obuv. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Jediná cesta, jak kontaktovat prodejce, je formulář na webu, na ten však podle spotřebitelských podání nikdo nereaguje. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lidovybeh', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především obuv. Podle spotřebitelských informací po zaplacení kartou je stržena mnohem vyšší částka, než je uvedeno u zboží. Po zaplacení a po delší době místo dražších značkových bot dorazily nakonec "žabky". Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'clubcantare', 
//  description: 'Podle spotřebitelských informací po objednávce nedorazí žádné potvrzení objednávky. Po zaplacení předem kartou nedorazí ani zboží. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'moja-cajovna', 
//  description: 'Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lekarna-protebe', 
//  description: 'Stránky údajné lékárny s volným prodejem přípravků a léků, některé jsou výhradně na lékařský předpis. Stránky jsou anonymní. Provozovatel webu volným prodejem přípravků, které mají být výhradně na předpis, zásadně porušuje platné zákony. Obchodní podmínky jsou nedostatečné. Některé nabízené výrobky neznámého původu jsou jen za zlomek skutečné ceny na trhu a nemusejí být pravé. Před nákupem na těchto stránkách Česká obchodní inspekce důrazně varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mujbioshop', 
//  description: 'Stránky nemají žádné obchodní podmínky, není žádný kontakt, jsou zcela anonymní. Místo firmy, která prodávala bio výrobky, jak napovídá název domény, nyní je na webu vystavena obuv a oblečení. Na doménu nás upozornili nejen spotřebitelé, ale i původní vlastník, který doménu neprodloužil. Stránky považuje ČOI za rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'salonpompadour', 
//  description: 'Na webu je nabídka obuvi. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'jinart', 
//  description: 'Na webu je nabídka obuvi. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tanecnicentrum-vm', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Název webu neodpovídá nabízenému zboží, tím je především oblečení a obuv. Stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'klubklid', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Na webu je nabídka obuvi. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zahrady-acaero', 
//  description: 'Název webu neodpovídá nabízenému zboží, tím je především oblečení a obuv. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Jediná cesta, jak kontaktovat prodejce, je formulář na webu, na ten však podle spotřebitelských podání nikdo nereaguje. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: '1saty', 
//  description: 'Podle spotřebitelských informací šaty na míru dorazily po velmi dlouhé době a v nenositelném stavu: špatné šití, vadný zip, špatná velikost. Reklamace provozovatel nepřijímá. Čeština se na stránkách mísí se slovenštinou a je velmi špatná, jedná se zřejmě o strojový překlad. Kontakt je dokonce ve španělštině, avšak neobsahuje zásadní informace o provozovateli, ani adresu, ani e-mail. Nejsou zde uvedeny žádné identifikační údaje prodávajícího. Stránky neobsahují ani základní informace o prodejci, neinformují spotřebitele o jeho právech. Z výše uvedených důvodů hodnotí ČOI web jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bosaksro', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Nejsou zde uvedeny žádné identifikační údaje prodávajícího, jediným kontaktem je formulář na webu. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Z výše uvedených důvodů hodnotí ČOI web jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'ttechwebdesign', 
//  description: 'Název domény neodpovídá nabízenému zboží, tím je především obuv. Podle spotřebitelských informací po zaplacení kartou je stržena mnohem vyšší částka (o 600 Kč více), než je uvedeno u zboží. Po zaplacení nedorazí ani žádný potvrzovací e-mail, ani zásilka. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz1.thefortelove', 
//  description: 'Webové stránky slibují naprosto neznámý přípravek. Na stránky jsou spotřebitelé odkazováni ve spamech, které chodí do elektronické pošty. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Web je anonymní, výrobek zcela neznámý a mohl by mít i negativní vliv na lidské zdraví. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'visario', 
//  description: 'Podle spotřebitelských informací je vyžadována platba předem a stržena z účtu vyšší částka, než je uvedena u výrobků (údajně o 700 Kč více). Peníze odcházejí dle bankovních výpisů v měně CNY - Čínský jüan. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'prohodonin', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Na webu je nabídka obuvi. Podle spotřebitelských informací po zaplacení značkových bot přijdou boty jiné než očekávané kvality, na reklamace vůbec nikdo nereaguje. V balíku nebyla žádná faktura. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'czech.bioretin-official', 
//  description: 'Na stránkách je nabízen je neznámý kosmetický výrobek. Po objednání výrobku je ze strany provozovatele dle spotřebitelských informací ihned cena navýšena zhruba o 200 Kč. Na stránkách probíhá odpočítávání času, aby byl spotřebitel nucen se ke koupi rozhodnout ve spěchu. Jde však o nekalou obchodní praktiku, aktualizací stránky se odpočítáváná znovu. Stránky odkazují na firmu BERNADATTE LTD, Av Ricardo J. Alfaro, Panama International, která je uvedena u celé řady dalších rizikových webů. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hradubickenovinky', 
//  description: 'Internetové stránky neodpovídají názvu nabízeného zboží, tím je především obuv a oblečení. Opuštěná doména byla dříve využívána pro jiné účely. Na stránkách nejsou uvedeny žádné povinné informace o prodávajícím, obchodní podmínky zcela chybí. E-shop je strojově a špatně přeložen do českého jazyka. Před nákupem na těchto stránkách Česká obchodní inspekce spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fitnesslitomysl', 
//  description: 'Internetové stránky neodpovídají názvu nabízeného zboží, tím je především obuv a oblečení. Opuštěná doména byla dříve využívána pro jiné účely. Na stránkách nejsou uvedeny žádné povinné informace o prodávajícím, obchodní podmínky zcela chybí. Podle spotřebitelských informací po zaplacení za zboží nikdo nereaguje, zboží nepřichází. Před nákupem na těchto stránkách Česká obchodní inspekce spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'rus-runa', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Na webu je nabídka obuvi. Podle spotřebitelských informací po zaplacení značkových bot přijdou boty jiné než očekávané kvality, na reklamace vůbec nikdo nereaguje. V balíku nebyla žádná faktura. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'slocz', 
//  description: 'Stránky vzbuzují dojem oficiálního prodejce značky Salomon. Výrobky neznámého původu jsou nabízeny jen za zlomek skutečné ceny na trhu a nemusejí být pravé. Web je zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'ceprobe', 
//  description: 'Podle spotřebitelských informací je vyžadována platba předem a stržena z účtu vyšší částka, než je uvedena u výrobků. Peníze odcházejí dle bankovních výpisů údajně do Číny. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'i-deal24', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Nabízen je neznámý výrobek. Probíhá odpočítávání tří minut, po tuto dobu platí údajně skvělá sleva. Je to však nekalá obchodní praktika s cílem donutit spotřebitele k nákupu a nepřemýšlet, po aktualizaci stránky totiž odpočítávání běží znovu. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.powerfactorpro', 
//  description: 'Na webech je nabízeno zařízení na údajné šetření spotřeby elektrické energie. Toto zařízení však energii nemůže ušetřit, ale naopak ji spotřebovává. Může se navíc jednat o nebezpečný výrobek. V roce 2012 byl do systému RAPEX nahlášen velmi podobný výrobek Power Factor Saver, výrobek představoval nebezpečí úrazu elektrickým proudem, protože napětí na kolících po odpojení výrobku ze zásuvky bylo příliš vysoké. Internetové stránky jsou provozovány zahraničními osobami, které figurují u jiných rizikových webů, sídlo uvádějí v Panamě.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lieferungpillen', 
//  description: 'Stránky údajné lékárny s volným prodejem přípravků a léků, které jsou výhradně na lékařský předpis. Jako provozovatel je údajně společnost se sídlem na Kypru. Provozovatel webu volným prodejem přípravků, které mají být výhradně na předpis, zásadně porušuje platné zákony. Obchodní podmínky jsou nedostatečné. Nabízené výrobky neznámého původu jsou nabízeny jen za zlomek skutečné ceny na trhu a nemusejí být pravé. Před nákupem na těchto stránkách Česká obchodní inspekce důrazně varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.theenergysaverbox', 
//  description: 'Na webech je nabízen prodej zařízení na šetření spotřeby elektrické energie. Toto zařízení však energii nemůže ušetřit, ale naopak ji spotřebovává. Může se navíc jednat o nebezpečný výrobek. V roce 2012 byl do systému RAPEX nahlášen velmi podobný výrobek Power Factor Saver, výrobek představoval nebezpečí úrazu elektrickým proudem, protože napětí na kolících po odpojení výrobku ze zásuvky bylo příliš vysoké. Internetové stránky jsou provozovány zahraničními osobami, které figurují u jiných rizikových webů, sídlo uvádějí v Panamě.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'ostrovskeozveny', 
//  description: 'Na webu je nabídka obuvi. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Jediná cesta, jak kontaktovat prodejce, je formulář na webu. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'truthofthisworld', 
//  description: 'Na webu je nabídka oblečení a obuvi. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Jediná cesta, jak kontaktovat prodejce, je formulář na webu. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pragueactivators', 
//  description: 'Web je zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Jediná cesta, jak kontaktovat prodejce, je formulář na webu. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz4.theelmacho', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji přes reklamu, slibují neznámý přípravek na rychlou erekci. Informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena údajně firma z Panamy, která figuruje u mnoha jiných rizikových e-shopů. Na stránkách odbíhá odpočítávání kusů, které zbývají, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hasicidolnimecholupy', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Podle informací spotřebitelů je vyžadována platba předem, po úhradě ale zboží nepřichází. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lenka-nehty', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval anonymní subjekt. Na webu je nabídka obuvi. Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'gabiony-bouse', 
//  description: 'Na webu je nabídka obuvi. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Jediná cesta, jak kontaktovat prodejce, je formulář na webu. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'achatpharma', 
//  description: 'Na webu je nabídka obuvi. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Jediná cesta, jak kontaktovat prodejce, je formulář na webu. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'znacekobuv', 
//  description: 'Na webu je nabídka obuvi. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Jediná cesta, jak kontaktovat prodejce, je formulář na webu. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.thevarbooster', 
//  description: 'Webové stránky slibují naprosto neznámý přípravek na křečové žíly. Na stránky jsou spotřebitelé odkazováni ve spamech, které chodí do elektronické pošty. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Web je anonymní, jen v zápatí je uvedeno, že se jedná o subjekt z Panamy. Výrobek zcela neznámý. Na stránkách navíc probíhá odpočítávání času jako nátlak na spotřebitele. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'internet-televize-volani', 
//  description: 'Webové stránky jsou zařazeny mezi rizikové také na základě varování ČTÚ před neznámou společností, která není zaregistrována jako podnikatel v el. komunikacích, ačkoli nabízí údajně připojení k těmto službám. Na stránce je v sekci kontakt pouze obyčejný formulář. Web je zcela anonymní, neobsahuje zákonné náležitosti.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.theartrovex', 
//  description: 'Webové stránky slibují naprosto neznámý přípravek na klouby. Na stránky jsou spotřebitelé odkazováni ve spamech, které chodí do elektronické pošty. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Web je anonymní, výrobek zcela neznámý a mohl by mít i negativní vliv na lidské zdraví. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'econtech', 
//  description: 'Na webu je nabídka obuvi. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Jediná cesta, jak kontaktovat prodejce, je formulář na webu. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'czr.titan-man', 
//  description: 'Webové stránky slibují naprosto neznámý přípravek na zvětšení mužského přirození. Na stránky jsou spotřebitelé odkazováni ve spamech, které chodí do elektronické pošty. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Web je anonymní, výrobek zcela neznámý a mohl by mít i negativní vliv na lidské zdraví. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'shopnaturenow', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na zlepšení sluchu, tento výrobek však úmyslně není prezentován jako naslouchátko, ačkoli fakticky naslouchátkem je. Na naslouchátko, coby stanovený výrobek, se vztahují povinnosti, které tento přístroj nesplňuje. Lékaři před tímto výrobkem spotřebitele varují. Kontaktem na webu je výhradně formulář a opět tel. číslo +420 234102147, které se objevuje u celé řady rizikových e-shopů, viz níže. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'worldinfoclub', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky jsou zcela nedostatečné. Na stránkách je pak nabízen pochybný výrobek na zlepšení sluchu, tento výrobek však úmyslně není prezentován jako naslouchátko, ačkoli fakticky naslouchátkem je. Na naslouchátko, coby stanovený, výrobek se vztahují povinnosti, které tento přístroj nesplňuje. Lékaři před tímto výrobkem spotřebitele varují. Kontaktem na webu je výhradně formulář a opět tel. číslo +420 234102147, které se objevuje u celé řady rizikových e-shopů, viz níže. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz1.thewelltox', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt na pleť. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel může prodejce kontaktovat výhradně přes formulář. Stránka má v zápatí uvedeno Panama International. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'facestyle', 
//  description: 'Na webu je nabídka obuvi. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Jediná cesta, jak kontaktovat prodejce, je formulář na webu. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bestrcs', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval neznámý subjekt. Po požadavku uhradit zboží předem kartou dle podání spotřebitele žádné zboží nedorazí a na kontaktování přes formulář na stránkách nikdo nezareaguje. Jako provozovatel není uveden také nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'slomek', 
//  description: 'Na webu je nabídka obuvi. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'travelovers', 
//  description: 'Bývalý majitel domény stránky přestal využívat, jako volnou doménovou adresu si ji zaregistroval subjekt patrně z Asie. Po požadavku uhradit zboží kartou odcházejí peníze z účtu do Číny dle podání spotřebitelů. Přijde zboží nižší kvality. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'krcma-marketa', 
//  description: 'Na webu je nabídka obuvi. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kalasovoreznictvi', 
//  description: 'Na webu je nabídka obuvi, zaplacení pouze kartou. Stržena jiná – mnohem vyšší částka. Na reklamace nikdo nereaguje. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lukasvalis', 
//  description: 'Na webu je nabídka obuvi, zaplacení pouze kartou. Stržena jiná – mnohem vyšší částka. Na reklamace nikdo nereaguje. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cukrovivsetin', 
//  description: 'Na webu je nabídka obuvi, zaplacení pouze kartou. Stržena jiná – mnohem vyšší částka. Na reklamace nikdo nereaguje. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'areareklama', 
//  description: 'Na webu je nabídka obuvi, zaplacení pouze kartou. Stržena jiná – mnohem vyšší částka. Na reklamace nikdo nereaguje. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'anstyl', 
//  description: 'Na webu je nabídka obuvi, zaplacení pouze kartou. Stržena jiná – mnohem vyšší částka. Na reklamace nikdo nereaguje. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'extrapecka', 
//  description: 'Na webu je nabídka obuvi, zaplacení pouze kartou. Stržena jiná – mnohem vyšší částka. Na reklamace nikdo nereaguje. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'tbautodily', 
//  description: 'Na webu není nabídka autodílů, jak by se dalo očekávat, ale nabídka obuvi. Po objednání a zaplacení dodáno zcela jiné zboží – neznačkové, o dvě čísla menší. Na reklamace nikdo nereaguje. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lsfeghhr.bestseller-super', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý a údajně zázračný přípravek k vnitřnímu užití, který by vás měl zbavit závislosti na alkoholu. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Na stránkách probíhá odpočítávání času, po který uvedená nabídka platí, avšak časomíra se vrací zpět, jde o nekalou obchodní praktiku a nátlak na spotřebitele, aby nakoupil a neměl čas o nabídce přemýšlet. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz1.therecardio', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt na léčbu srdeční hypertenze. Jedná se však o neznámý přípravek, který má sloužit k léčbě, aniž by byl schválen Státním ústavem pro kontrolu léčiv. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena společnost z Panamy. Na stránkách probíhá odpočítávání času, po který uvedená nabídka platí, avšak časomíra se vrací zpět, jde o nekalou obchodní praktiku a nátlak na spotřebitele, aby nakoupil a neměl čas o nabídce přemýšlet. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'provadenistaveb', 
//  description: 'Na webu není nabídka staveb, jak by se dalo očekávat, ale nabídka obuvi. Po objednání a zaplacení dodáno zcela jiné zboží. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'svetovniezici', 
//  description: 'Společnost lze kontaktovat výhradně formulářem. Uvedené údaje vedou do Las Vegas, přičemž doména je registrovaná v Belgii. Obchodní podmínky jsou zcela nedostatečné. I na základě negativních zkušeností spotřebitelů Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'skvizovice', 
//  description: 'Stránky původně místního fotbalového klubu po expiraci koupeny neznámým subjektem. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'lmftiiyw.bestseller-super', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt na klouby. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'jakubhoudek', 
//  description: 'Opuštěná doména, která původně sloužila k jinému účelu. Na webu je nabídka obuvi. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'planetinfocenter', 
//  description: 'Na webu je nabízen údajně „zázračný“ přístroj na úsporu paliva a efektivnost motoru. Na stránkách je postupně odečítán počet kusů s cílem vytvořit nátlak na spotřebitele k rychlému nákupu. Ani není zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Na stránkách je pouze kontaktní formulář a telefonní číslo, které je u mnoha dalších rizikových webů. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fastcomputerreport', 
//  description: 'Na webu je nabízen flash disk údajně ke „zázračnému“ zrychlení práce s počítačem. Na webu je postupně odečítán počet kusů s cílem vytvořit nátlak na spotřebitele k rychlému nákupu. Ani není zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'thesetup', 
//  description: 'Opuštěná doména, která původně sloužila k jinému účelu. Na webu je nabízeno oblečení. Dle informací od spotřebitele po zaplacení nikdo nereaguje, zboží není doručeno. Ze stránek ani není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'snake4you', 
//  description: 'Na webu jsou nabízeny především boty. Dle informací od spotřebitelů po zaplacení nikdo nereaguje, zboží není doručeno. Ze stránek ani není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'thtex', 
//  description: 'Na webu je nabízena obuv. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'vmtip', 
//  description: 'Opuštěná doména, která původně sloužila k jinému účelu. Na webu jsou především nabízeny boty a brýle. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.theelmacho', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují zcela neznámý produkt pro muže. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Při zavření prohlížeče se objeví okamžitě nabídka objednat tento neznámý produkt se slevou. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'starmaxxpneu', 
//  description: 'Opuštěná doména, která původně sloužila k jinému účelu. Na webu není nabídka pneumatik, jak lze očekávat dle názvu, ale především obuv. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz8.theerogan', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují neznámý přípravek na rychlou erekci. Obchodní podmínky v češtině zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena údajně firma z Panamy, která figuruje u mnoha jiných rizikových e-shopů. Na stránkách odbíhá odpočítávání kusů, které zbývají, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Při aktualizaci stránky však zbývající kusy zase přibudou, jde o klamání spotřebitele. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zbynek-kohout', 
//  description: 'Ze stránek není zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Stránky jsou tedy zcela anonymní. Obchodní podmínky chybí. Před nákupem na těchto stránkách Česká obchodní inspekce i na základě podnětů spotřebitelů varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.mydiettonus', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují přípravek na rychlé zhubnutí. Obchodní podmínky v češtině zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel je uvedena údajně firma z Panamy. Na stránkách odbíhá odpočítávání času, aby spotřebitel byl tlačen k rozhodnutí a neměl čas o nákupu přemýšlet. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'enviedulife', 
//  description: 'Opuštěná doména, na které je nabízena obuv, doplňky a oděvy. Nejsou uvedeny žádné identifikační údaje prodávajícího, stránky jsou zcela anonymní. Spotřebitel nezjistí, s kým uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'xdrivestudio', 
//  description: 'Opuštěná doména, která původně sloužila k jinému účelu. Na webu je nabídka údajně značkového oblečení. Po provedení platby není zboží dodáno. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. E-shop je anonymní, spotřebitel tak neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zahradniosvetleni-cz', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cejkor', 
//  description: 'Opuštěná doména, na které je nabízena obuv, doplňky a oděvy. Nejsou uvedeny žádné identifikační údaje prodávajícího, stránky jsou zcela anonymní. Spotřebitel nezjistí, s kým uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'carcam-cz', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují kameru do auta. Obchodní podmínky zcela chybí, další informace na stránkách jsou nedostatečné. Jako provozovatel není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'rovapodlahy', 
//  description: 'Opuštěná doména, která původně sloužila k jinému účelu. Na webu není nabídka podlah, jak lze očekávat dle názvu, ale oblečení. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'pizzaperfetta', 
//  description: 'Opuštěná doména, která původně sloužila k jinému účelu. Na webu není nabídka pizzy, jak lze očekávat dle názvu, ale oblečení. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Po provedení platby není zboží dodáno. Česká obchodní inspekce před těmito stránkami spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cyklotrasycesko', 
//  description: 'Dodané zboží dle podání spotřebitelů neodpovídá objednávce, komunikace výhradně v angličtině, název domény neodpovídá nebízenému sortimentu (tím je obuv). Text je strojovým překladem, obchdní podmínky zcela chybí, stejně jako informace o prodejci. Web je zcela anonymní. Z uvedených důvodů ČOI hodnotí nákup jako zde rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kurde', 
//  description: 'Převážně nabídka obuvi a oblečení. Ze stránek není nikde zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Text jeví známky automatického překladu, ceny neodpovídají realitě. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'worldinfoclub', 
//  description: 'Výrobek nabízený na těchto stránkách slibuje zázračné zhubnutí 2,5 kg do zítřka. Ze stránek není zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Stránky jsou tedy zcela anonymní. Před nákupem na těchto stránkách Česká obchodní inspekce důrazně varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'infos-nosnore-cz', 
//  description: 'Internetové stránky, na které se dostanete nejčastěji na základě spamů v elektronické poště, slibují vyřešit chrápání údajně unikátním vynálezem, který má spotřebitel dávat do nosu na noc. Výrobek by mohl být i nebezpečný, protože si spotřebitel může znepřístupnit dýchání nosem. Na stránkách probíhá odpočítávání – časomíra, která nutí spotřebitele nepřemýšlet a rozhodnout se, protože po vypršení času údajně nabídka nebude platit. Jedná se však o nátlak na spotřebitele, po aktualizaci stránek odpočítávání začíná znovu. Ze stránek navíc není zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Stránky jsou tedy zcela anonymní. Před nákupem na těchto stránkách Česká obchodní inspekce důrazně varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'xhoseprocz', 
//  description: 'Ze stránek není zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Stránky jsou tedy zcela anonymní. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'nejkartarka', 
//  description: 'Internetové stránky neodpovídají názvu nabízeného zboží, tím jsou většinou boty. Ze stránek navíc není zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Stránky jsou tedy zcela anonymní. Před nákupem na těchto stránkách Česká obchodní inspekce i na základě podnětů spotřebitelů varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'autoservisfaan', 
//  description: 'Internetové stránky neodpovídají názvu nabízeného zboží, tím je především obuv a oblečení. Opuštěná doména byla dříve využívána pro jiné účely. Na stránkách nejsou uvedeny žádné povinné informace o prodávajícím, obchodní podmínky zcela chybí. Před nákupem na těchto stránkách Česká obchodní inspekce spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'taneczeme', 
//  description: 'Internetové stránky neodpovídají názvu nabízeného zboží, tím jsou většinou oděvy. Ze stránek navíc není zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Stránky jsou tedy zcela anonymní. Před nákupem na těchto stránkách Česká obchodní inspekce i na základě podnětů spotřebitelů varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zelenetrhy', 
//  description: 'Jedná se o nabídků oděvů a doplňků. Nejsou uvedeny žádné identifikační údaje prodávajícího, obchodní podmínky jsou nedostatečné, jde o strojový překlad do českého jazyka. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cafezlonin', 
//  description: 'Internetové stránky neodpovídají názvu nabízeného zboží, tím je především oblečení, obuv a brýle. Ze stránek navíc není zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'skolkanahrade', 
//  description: 'Ze stránek není zřejmé, kdo je provozovatelem, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Opuštěná doména byla dříve využívána pro jiné účely. Doménová adresa dokonce nesouvisí s nabízeným zbožím (boty, oblečení). Před nákupem na těchto stránkách Česká obchodní inspekce spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bibliotecadelvino', 
//  description: 'Na e-shopu je prodávána obuv, chybí zde jakékoli identifikační údaje prodávajícího, obchodní podmínky jsou zcela nedostatečné, jedná se o opuštěnou doménu, která nejspíš původně sloužila k jinému účelu než k prodeji obuvi. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fitstudiojump', 
//  description: 'Na stránkách nejsou uvedeny žádné povinné informace o prodávajícím, obchodní podmínky zcela chybí. Opuštěná doména byla dříve využívána pro jiné účely. Doménová adresa dokonce nesouvisí s nabízeným zbožím (boty, oblečení). Před nákupem na těchto stránkách Česká obchodní inspekce spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'e-porovnani', 
//  description: 'Na e-shopu je prodávána obuv, chybí zde jakékoli identifikační údaje prodávajícího, obchodní podmínky jsou zcela nedostatečné, jedná se o opuštěnou doménu, která nejspíš původně sloužila k jinému účelu než k prodeji obuvi. Překlad do češtiny je strojový. ČOI e-shop hodnotí jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'fanshopzlin', 
//  description: 'Na e-shopu je prodávána obuv, chybí zde jakékoli identifikační údaje prodávajícího, obchodní podmínky jsou zcela nedostatečné, jedná se o opuštěnou doménu, která nejspíš původně sloužila k jinému účelu než k prodeji obuvi. Překlad do češtiny je strojový. ČOI e-shop hodnotí jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bestpromocenter', 
//  description: 'Nabídka pilulek na prakticky okamžité zhudnutí. Fotky údajného profesora Druckamanna, který výrobek doporučuje, je stažen z databanky, jméno lékaře je také pravděpodobně smyšlené. Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí, na stránkách je pak nabízen pochybný výrobek s údajně zázračnou schopností. Česká obchodní inspekce nákup zde považuje za rizikový. Kontaktem je formulář a také tel. číslo +420 234102147, které se objevuje u celé řady rizikových e-shopů.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'bestofferstar', 
//  description: 'Z webových stránek není zřejmé, kdo je provozovatelem e-shopu, tedy s kým spotřebitel uzavírá smlouvu a vůči komu může nárokovat svá práva. Obchodní podmínky zcela chybí, na stránkách je pak nabízen pochybný výrobek s údajně zázračnou schopností odbourat tuky a vytvořit svaly bez cvičení. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.ecoslimmer', 
//  description: 'Na e-shopu je prodávána obuv, chybí zde jakékoli identifikační údaje prodávajícího, obchodní podmínky nejsou vůbec žádné. ČOI e-shop hodnotí jako rizikový. Nabízená potravina má mít léčebné účinky, což je v rozporu s právními předpisy a provozovatel webových stránek se může též dopouštět nekalé obchodní praktiky. Česká obchodní inspekce nákup zde považuje za rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'eurorcrally', 
//  description: 'V minulosti tuto internetovou doménu používal spolek modelářů rádiově ovládaných modelů aut, posléze však doménu včas nezaplatil a tak o ni přišel. Nyní se na stránkách objevila nabídka obuvi. V textech se vyskytuje značné množství chyb a nesmyslných formulací, jedná se zcela zřejmě o nekvalitní automatický překlad. Chybí zde jakékoli identifikační údaje prodávajícího. ČOI e-shop hodnotí jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'xiomnia', 
//  description: 'Dle podání spotřebitelů se při registraci zapojíte do „soutěže“ o telefon, následně každý den je strhávána částka minimálně 99 Kč, ale většinou těchto zpoplatněných SMS bude za den několik. Spotřebitelé jsou nalákáni pod různými záminkami. Autoři se dokonce maskují pod značkou jiných společností, vydávají se například za Seznam.cz. Stránky jsou strojově přeloženy Google translatorem s lehkými chybami. Na stránkách je uvedeno, že provozovatelem je subjekt ze Singapuru. Vzhledem k těmto zkušenostem, podání spotřebitelů a také vzhledem k přeposlání informací z ČTÚ zařazuje Česká obchodní inspekce tyto stránky mezi rizikové.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'umincovny', 
//  description: 'Internetové stránky neodpovídají názvu nabízeného zboží. V nabídce je především obuv. Na stránkách není k nalezení žádný kontakt na prodejce. Jediným kontaktem je pouze formulář, na ten podle spotřebitelů nikdo nereaguje. ČOI e-shop hodnotí jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kickshoes', 
//  description: 'Internetové stránky nabízející obuv, na stránkách chybí jakékoli obchodní podmínky, naprosoto žádné informace i prodávajícím. Držitelem domény má být osoba se sídle v USA, platba je však podle spotřebitelů zaúčtována vždy v čínských juanech. Jediný kontakt je přes formulář na údajného webmastera, nikdo však neodpovídá. Z výše uvedených důvodů hodnotí ČOI e-shop jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.flame-fashion', 
//  description: 'Na webu chybí jakékoli údaje o prodejci. Stránky mají velmi nepovedený strojový překlad do češtiny. I na základě podání spotřebitelů nákup na těchto stránkách hodnotí ČOI jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'thebactefort', 
//  description: 'Na webových stránkách probíhá odpočítávání času, po který platí údajně výhodná nabídka. Nicméně časomíra se znovu zrestartuje. Je to nátlak na spotřebitele s cílem prodat mu výrobek, ačkoli o jeho vlastnostech není nic známo, prodejce je zcela anonymní. Stránky naplňují všechny znaky rizikových e-shopů a ČOI před nákupem zde spotřebitele varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'certovachata', 
//  description: 'Na stránkách nejsou žádné obchodní podmínky a ani kontaktní údaje, platba je možná pouze předem. Stránky naplňují veškeré znaky rizikových e-shopů. ČOI před nákupem zde varuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'hokejovedresy', 
//  description: 'Jedná se o internetový obchod v českém jazyce, ačkoli platba je možná pouze v cizí měně. Stránky anonymní, tedy bez identifikace prodávajícího, s nedostatečnými obchodními podmínkami v podobě nepovedeného strojového překladu do českého jazyka. Nákup zde hodnotí ČOI jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'nikolka-zikova', 
//  description: 'Tento e-shop prodává oblečení a obuv, chybí zde jakékoli informace o prodávajícím, obchodní podmínky jsou zcela nedostatečné. Nákup zde hodnotí ČOI jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'club-valentino', 
//  description: 'Opět se jedná o e-shop s oděvy a obuví, na stránkách chybí identifikační údaje prodávajícího, obchodní podmínky jsou nedostatečné, držitelem domény je osoba se sídlem v Číně. (Je zde podezření, že obchod prodává padělky, na ČOI se obrátila zástupkyně jedné ochranné známky). Z výše uvedených důvodů hodnotí ČOI e-shop jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'nohejbalzlin', 
//  description: 'Domény po expiraci, kterou někdo využívá k vystavení zboží, nejčastěji bot. Překlad do češtiny je strojový, věty někdy nedávají smysl. Na e-shopu je nabízeno zboží, prodejce je však zcela anonymní. ČOI hodnotí nákup na této doméně jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'curentlyoffer', 
//  description: 'Na uvedené stránce nejsou jakékoli údaje o prodávajícím. Navíc pro spotřebitele odbíhá časomíra, která údajně počítá čas, kdy vyprší „výhodná“ nabídka, avšak jde o klamání, protože po aktualizaci stránky časomíra se vynuluje. Jedná se tak jen o nátlak na spotřebitele s cílem přimět jej k objednávce zboží na těchto anonymních stránkách. Podle informací od spotřebitelů ani po objednání nezíská spotřebitel informace o prodejci, není kam odstoupit od kupní smlouvy, ani není koho kontaktovat. Z těchto důvodů hodnotí Česká obchodní inspekce nákup na těchto stránkách jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'onycosolveoriginal', 
//  description: 'Doména je registrovaná ze zahraničí. Obchodní podmínky jsou zcela nedostatečné, stejně tak společnost naprosto nereaguje na reklamace a vrácení zboží do 14 dnů bez udání důvodu. Jako provozovatel je uvedena společnost Onycosolve LLC, 2000 Town Center, Southfield, Michigan.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'product-club', 
//  description: 'Na stránkách nejsou žádné údaje o prodávajícím. Nedůvěryhodné recenze. Stránky Vás přesunou na jiné další podobné weby, např. bustural.com, kde dochází cíleně k odpočítávání (nátlak na rozhodnutí spotřebitele), fotografie údajně spokojených zákazníku z fotobanky, registrace stránek na Panamě.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'stavimesvami', 
//  description: 'Z těchto stránek není zřejmé, kdo je provozovatelem e-shopu. Zcela zde chybí jakékoli informace o prodávajícím, obchodní podmínky jsou také naprosto nedostatečné. Nákup na těchto stránkách z výše uvedených důvodů hodnotí ČOI jako rizikový.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'biofreshfood', 
//  description: 'Doména má držitele se sídlem v Číně, na stránkách nejsou uvedeny žádné informace o prodávajícím, obchodní podmínky jsou nedostatečné – jedná se pravděpodobně o strojový překlad do českého jazyka. Název domény odkazuje na jiný druh zboží (potraviny), než je na stránkách prodáván (obuv).', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'czechmoda', 
//  description: 'Na tomto e-shopu je prodávána obuv, oblečení a doplňky, důvodem pro zveřejnění je důvodné podezření, že jsou na tomto e-shopu prodávány padělky. Prodávajícím je společnost Vulcain Int LTD se sídlem v Bulharsku. Ve spolupráci s bulharským dozorovým orgánem bylo zjištěno, že se prodávající na uváděné adrese nevyskytuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'econorcz.slipkas', 
//  description: 'E-shop nabízí „přístroj pro šetření elektřiny“. Na stránkách nejsou uvedeny žádné informace o prodávajícím ani obchodní podmínky, naopak se zde vyskytují zřejmě fiktivní komentáře spokojených uživatelů s fotografiemi, které pocházejí z fotobanky. Držitel domény je z Ruska.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'zavlahy-cz', 
//  description: 'Na základě podnětu spotřebitele Česká obchodní inspekce prověřila internetové stránky a zjistila, že na nich nejsou uvedeny žádné údaje, prostřednictvím kterých by bylo možné identifikovat prodávajícího. Nepodařilo se ani identifikovat subjekt, na který je tato doména registrována. Obchodní podmínky, stejně jako povinně uváděné náležitosti týkající se identifikace subjektu, také chybí.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'mruklid', 
//  description: 'Na stránkách chybí jakékoli údaje o prodávajícím, obchodní podmínky neobsahují zákonem požadované informace, jedná se o automatický překlad do českého jazyka. Držitelé domén jsou ze zahraničí (Čína).', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'teloveoleje', 
//  description: 'Na stránkách chybí jakékoli údaje o prodávajícím, obchodní podmínky neobsahují zákonem požadované informace, jedná se o automatický překlad do českého jazyka. Držitelé domén jsou ze zahraničí (Čína).', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'newenergysaver', 
//  description: 'Na webech je nabízen prodej zařízení na šetření spotřeby elektrické energie. Toto zařízení však energii nešetří, ale naopak ji spotřebovává. Může se navíc jednat o nebezpečný výrobek. V roce 2012 byl do systému RAPEX nahlášen výrobek Power Factor Saver, výrobek představoval nebezpečí úrazu elektrickým proudem, protože napětí na kolících po odpojení výrobku ze zásuvky bylo příliš vysoké. Internetové stránky jsou provozovány zahraničními osobami, konkrétně společností PROTECTSERVICE, LTD., se sídlem na Kypru (newenergysaver.pro), stránky cz.technoweek.info jsou provozovány společností WhoisGuard, Inc. se sídlem v Panamě.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'kozloviceunepomuka', 
//  description: 'Na stránkách je nabízena zejména obuv. Na těchto doménách se nevyskytují žádné údaje o prodávajícím. Obchodní podmínky nasvědčují tomu, že se jedná o nepovedený (automatický) překlad do českého jazyka. Česká obchodní inspekce před nákupem na těchto doménách spotřebitele varuje. Název internetové stránky často ani neodpovídá prodávanému sortimentu (v názvu internetové stránky je např. výraz „instalatérství“, prodávaným zbožím je však obuv). Registrátorem stránek je společnost 1API GmbH, Talstrasse 27, 66424 Homburg, Německo, držitelem zpravidla osoby sídlící v Německu či na české fiktivní adrese.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'geomedia', 
//  description: 'Na stránkách je nabízena zejména obuv. Na těchto doménách se nevyskytují žádné údaje o prodávajícím. Obchodní podmínky nasvědčují tomu, že se jedná o nepovedený (automatický) překlad do českého jazyka. Česká obchodní inspekce před nákupem na těchto doménách spotřebitele varuje. Název internetové stránky často ani neodpovídá prodávanému sortimentu (v názvu internetové stránky je např. výraz „instalatérství“, prodávaným zbožím je však obuv). Registrátorem stránek je společnost 1API GmbH, Talstrasse 27, 66424 Homburg, Německo, držitelem zpravidla osoby sídlící v Německu či na české fiktivní adrese.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'uzeniny-domu', 
//  description: 'Na stránkách je nabízena zejména obuv. Na těchto doménách se nevyskytují žádné údaje o prodávajícím. Obchodní podmínky nasvědčují tomu, že se jedná o nepovedený (automatický) překlad do českého jazyka. Česká obchodní inspekce před nákupem na těchto doménách spotřebitele varuje. Název internetové stránky často ani neodpovídá prodávanému sortimentu (v názvu internetové stránky je např. výraz „instalatérství“, prodávaným zbožím je však obuv). Registrátorem stránek je společnost 1API GmbH, Talstrasse 27, 66424 Homburg, Německo, držitelem zpravidla osoby sídlící v Německu či na české fiktivní adrese.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'janbruzenak', 
//  description: 'Na stránkách je nabízena zejména obuv. Na těchto doménách se nevyskytují žádné údaje o prodávajícím. Obchodní podmínky nasvědčují tomu, že se jedná o nepovedený (automatický) překlad do českého jazyka. Česká obchodní inspekce před nákupem na těchto doménách spotřebitele varuje. Název internetové stránky často ani neodpovídá prodávanému sortimentu (v názvu internetové stránky je např. výraz „instalatérství“, prodávaným zbožím je však obuv). Registrátorem stránek je společnost 1API GmbH, Talstrasse 27, 66424 Homburg, Německo, držitelem zpravidla osoby sídlící v Německu či na české fiktivní adrese.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'play.mobistos', 
//  description: 'Stránka láká na výhru v podobě iPhone7, z textu drobným písmem je ale patrné, že se ve skutečnosti jedná o předplatné prémiových SMS v ceně 99 Kč/týden. Provozovatel je podle textu na stránce subjekt sídlící v Singapuru, stránky jsou zaregistrované na subjekt sídlící v Panamě.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'cz.top-battery-adapter', 
//  description: 'Jedná se o internetový obchod nabízející akumulátory a adaptéry na notebooky. Jde zcela evidentně o zahraniční web, jako kontakt má jen webový formulář a adresu uvádí: Rm 37, 2/F, Tsuen Cheng Center, Sai Lau Kok Road, Tsuen Wan, NT, HKSAR. Web je přeložen do češtiny zřejmě robotem, nákup zde se rovná riziku nákupu na ulici od neznámé osoby, možnost reklamace takřka nulová. Spotřebitelé v podnětech uvádějí, že si objednali adaptér (platba proběhla předem na účet přes Paypal), ze zahraničí jim byl poslán jiný typ adaptéru a dále už s nimi prodávající nekomunikuje.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'salesportal', 
//  description: 'Důvod zveřejnění: Z činnosti Evropského spotřebitelské centra při České obchodní inspekci vyplývá, že daná společnost ve větším měřítku nedodává objednané a již zaplacené zboží, případně řádně neřeší spotřebitelské reklamace zboží. Na základě konciliační činnosti sítě Evropských spotřebitelských center se nedaří spotřebitelské stížnosti na tohoto podnikatele úspěšně řešit.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'centrum-akci', 
//  description: 'Důvod zveřejnění: Na stránkách je nabízen výukový program pro studium jazyků „multimediální internetová platforma interaktivních frází Fast Phrases“, nejsou zde však žádné informace o provozovateli a zcela chybí obchodní podmínky. Obrázek údajného majitele jazykové školy „Karla Lepiče“ pochází z pravděpodobně z fotobanky, stejně jako fotografie údajných spokojených zákazníků.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'magnufuel', 
//  description: 'Důvod zveřejnění: Podle informací na stránkách je prodávajícím společnost Magnufuel LLC. sídlící v USA. Na stránkách zcela chybí informace o možnostech uplatnění reklamace, informace o možnosti odstoupení od smlouvy neodpovídají zákonným požadavkům. Odpočítávání 15 minut pro objednání zboží za sníženou cenu začne po vypršení času znovu od začátku, totéž nastává při novém načtení stránky.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'optimaskpro', 
//  description: 'Důvod zveřejnění: Podle informací na stránkách je prodávajícím společnost OptiMaskPro LLC se sídlem v USA. Na stránkách jsou sice vyvěšeny všeobecné obchodní podmínky, ale zcela chybí informace o možnostech uplatnění reklamace, informace o možnosti odstoupení od smlouvy neodpovídají zákonným požadavkům.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'realquit', 
//  description: 'Důvod zveřejnění: Podle informací na stránkách je prodávajícím společnost RealQUIT Inc., která sídlí v USA. Na stránkách zcela chybí informace o možnostech uplatnění reklamace, informace o možnosti odstoupení od smlouvy neodpovídají zákonným požadavkům. Na úvodní stránce je představena údajná časově omezená zaváděcí nabídka, čas 15:59 min., který zbývá podle počitadla do jejího konce, se však obnovuje při každém novém načtení stránky, automaticky se také obnoví, když jej návštěvník stránky nechá jednoduše vypršet.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'nidora', 
//  description: 'Důvod zveřejnění: Na stránkách chybí řádné informace o možnosti a způsobu uplatnění reklamace. Chybí také řádná informace o právu na odstoupení od smlouvy. Přestože stránky jsou v českém jazyce a ceny uvedeny v českých korunách, jediná adresa podle informací přímo na stránkách je na společnost Global Diet Solutions LLC se sídlem v USA.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'never-grey-cz', 
//  description: 'Důvod zveřejnění: Provozovatel těchto webových stránek v českém jazyce, kde jsou prodávány výrobky za ceny v Kč, je společnost REACTIVATION PERIOD, která sídlí v USA (zjištěno pouze z databáze Whois), chybí jakékoliv identifikační a kontaktní údaje, žádné obchodní podmínky.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'valgomed', 
//  description: 'Důvod zveřejnění: Uváděný provozovatel Valgomed LLC sídlí v USA, odstoupení od smlouvy je v obchodních podmínkách upraveno v rozporu se zákonem, zcela chybí informace o možnostech uplatnění reklamace.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },
// { title: 'giga-shop', 
//  description: 'Důvod zveřejnění: Internetové stránky jsou v českém jazyce (jde zjevně o strojový překlad), ceny jsou uvedeny v českých korunách, provozovatelem je však společnost Giga FX Limited se sídlem na Seychelách. Obchodní podmínky jsou pouze v anglickém jazyce, chybí jasné identifikační a kontaktní údaje společnosti. V případě zakoupení mobilního telefonu je zde uvedeno, že nemá označení CE a jakýkoliv nákup je na vlastní nebezpečí.', 
//  owner: '627e407bd038f8538d010193', 
//  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy' 
// },

// ]


const scams = [
  { title: 'buyandorder', 
    description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
    owner: '627e407bd038f8538d010193', 
    link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy/' 
    },
  { title: 'altrarunnerscz', 
  description: 'Jako provozovatel webu není uveden nikdo, stránky jsou tedy zcela anonymní a spotřebitel neví, s kým uzavírá kupní smlouvu a vůči komu může nárokovat svá práva. Před nákupem na těchto stránkách Česká obchodní inspekce varuje.', 
  owner: '627e407bd038f8538d010193', 
  link: 'https://www.coi.cz/pro-spotrebitele/rizikove-e-shopy/' 
  },
]

const path = './scamArray.txt'
try {
  if (!fs.existsSync(path)) {
    scams.forEach(e => {
      writeFileSync('scamArray.txt', `{ title: '${fixUrlPreLoad(e.title)}', ${`\n`} description: '${e.description}', ${`\n`} owner: '62835e546ea337d452a13b56', ${`\n`} link: '${e.link}' ${`\n`}}` + ',' +  "\n", {flag: 'a'}
      )
      console.log(fixUrlPreLoad(e.title));
    });
  }
} catch(err) {
  console.error(err)
}


const start = async() => {
  try {
    await connectDB('mongodb+srv://vlado11:Lithuania11@mongodb.e55pm.mongodb.net/scam-web-manager-api')
    // await Website.deleteMany()
    const users = await User.find({})
    const user_id = users[0]._id
    await Website.create(scams)
    process.exit(0)
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

start()


// scams.forEach(e => {
//   writeFileSync('scamArray.txt', `{ title: '${fixUrlPreLoad(e.title)}', ${`\n`} description: '${e.description}', ${`\n`} owner: '627e407bd038f8538d010193',  ${`\n`} link: '${e.link}' ${`\n`}}`,  + ',' +  "\n", {flag: 'a'}
//   )
//   console.log(fixUrlPreLoad(e.title));
// });



// const run = async () => {
//   try {
//     await client.connect();
//     // Establish and verify connection
//     await client.db("scam-web-manager-api").command({ ping: 1 });
//     console.log("Connected successfully");
    

//     // scams.forEach((e) => {
//     //   await Website.create({
//     //     title: fixUrlPreLoad(e.title),
//     //     description: e.description,
//     //     link: e.link,
//     //     owner: "627e407bd038f8538d010193"
//     //   })
//     // })
//     await Promise.all(scams.map(async (e) => {
//         const website = await Website.create({
//           title: fixUrlPreLoad(e.title),
//           description: e.description,
//           link: e.link,
//           owner: "627e407bd038f8538d010193"
//         })
//         console.log(website);
//     }));
    
     
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);