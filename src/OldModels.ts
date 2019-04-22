import { Category, CategoryNames } from "./Models";

export class CompanyData {
    public companyCategory: CompanyCategory = null;
    public simId: number = 0;
    public name: string = '';
    public currentYearData: CompanyDataByYear;
    public nextYearData: CompanyDataByYear;
    public marketCap: number;
    public sMarketCap: string;

    public DSR: number = 0;
    public GMI: number = 0;
    public AQI: number = 0;
    public SGI: number = 0;
    public DEPI: number = 0;
    public SGAI: number = 0;
    public Accruals: number = 0;
    public LEVI: number = 0;

    public revenueChange: number = 0;

    public TLTA: number = 0;
    public SATA: number = 0;
    public LOGTA: number = 0;
    public CATA: number = 0;

    public ALTMAN_Z_SCORE: number = 0;

    public static calculateRevenueChange(company: CompanyData) {
        company.revenueChange = (company.nextYearData.revenues - company.currentYearData.revenues) / company.currentYearData.revenues;
    }

    public calculateVars(): boolean {
        let calculated: boolean = true;

        //DSR
        this.DSR = (this.nextYearData.receivablesNet / this.nextYearData.revenues) / (this.currentYearData.receivablesNet / this.currentYearData.revenues);

        //GMI
        this.GMI = this.currentYearData.grossMargin / this.nextYearData.grossMargin;

        //AQI
        const AQI1 = (1 - (this.nextYearData.propertyPlantAndEquipmentNet + this.nextYearData.totalCurrentAssets) / this.nextYearData.totalAssets);
        const AQI2 = (1 - (this.currentYearData.propertyPlantAndEquipmentNet + this.currentYearData.totalCurrentAssets) / this.currentYearData.totalAssets);
        this.AQI = AQI1 / AQI2;

        //SGI
        this.SGI = this.nextYearData.revenues / this.currentYearData.revenues;

        //DEPI
        const currentYearDeprecationRate = this.currentYearData.depreciationAmortisation / (this.currentYearData.depreciationAmortisation + this.currentYearData.propertyPlantAndEquipmentNet);
        const nextYearDeprecationRate = this.nextYearData.depreciationAmortisation / (this.nextYearData.depreciationAmortisation + this.nextYearData.propertyPlantAndEquipmentNet);
        this.DEPI = currentYearDeprecationRate / nextYearDeprecationRate;

        //SGAI
        this.SGAI = (this.nextYearData.sellingGeneralAndAdministrative / this.nextYearData.revenues) / (this.currentYearData.sellingGeneralAndAdministrative / this.currentYearData.revenues);

        //Acrruals
        this.Accruals = (this.nextYearData.incomeFromContinuingOperations - this.nextYearData.operatingCashFlow) / this.nextYearData.totalAssets;

        //LEVI
        this.LEVI = (this.nextYearData.totalDebt / this.nextYearData.totalAssets) / (this.currentYearData.totalDebt / this.currentYearData.totalAssets);


        if (!isFinite(this.AQI) || isNaN(this.AQI) || this.AQI == 0) {
            this.AQI = 1;
        }

        if (!isFinite(this.DEPI) || isNaN(this.DEPI) || this.DEPI == 0) {
            this.DEPI = 1;
        }

        if (!isFinite(this.SGAI) || isNaN(this.SGAI) || this.SGAI == 0) {
            this.SGAI = 1;
        }

        if (!isFinite(this.SGI) || isNaN(this.SGI)) {
            calculated = false;
        }

        if (!isFinite(this.DSR) || isNaN(this.DSR)) {
            calculated = false;
        }

        if (!isFinite(this.GMI) || isNaN(this.GMI)) {
            calculated = false;
        }

        if (!isFinite(this.Accruals) || isNaN(this.Accruals)) {
            calculated = false;
        }

        if (!isFinite(this.LEVI) || isNaN(this.LEVI)) {
            calculated = false;
        }

        return calculated;
    }

    public static calculateLastVars(company: CompanyData) {
        //TLTA
        company.TLTA = company.nextYearData.totalCurrentLiabilities / company.nextYearData.totalAssets;

        //SATA
        company.SATA = company.nextYearData.revenues / company.nextYearData.totalAssets;

        //LOGTA
        company.LOGTA = Math.log(company.nextYearData.totalAssets);

        //CATA
        company.CATA = company.nextYearData.totalCurrentAssets / company.nextYearData.totalAssets

        company.ALTMAN_Z_SCORE = CompanyData.calculateAltmanZScore(company);
    }

    public static calculateAltmanZScore(company: CompanyData): number {
        // XI = (current assets - current liabilities) / total assets,
        //     X2 = (Net income-dividend paid )/ total assets,
        //     X3 = EBIT / total assets,
        //     X4 = market capitalization/ total liabilities,
        //     X5 = revenue / total assets.

        const X1 = (company.currentYearData.totalCurrentAssets - company.currentYearData.totalCurrentLiabilities)
            / company.currentYearData.totalAssets;

        const X2 = (company.currentYearData.receivablesNet - company.currentYearData.revenues)
            / company.currentYearData.totalAssets;

        const X3 = company.currentYearData.receivablesNet / company.currentYearData.totalAssets;

        const X4 = company.marketCap

        return 0;
    }

    public static filterCompaniesByYear(companies: CompanyData[]): CompanyData[] {

        const uniqueCompanies: { [id: number]: { [id: number]: CompanyData } } = {};

        companies.forEach((company: CompanyData) => {
            const companyById: { [id: number]: CompanyData } = uniqueCompanies[company.simId];

            if (companyById != null) {
                const companyByYear: CompanyData = companyById[company.companyCategory.year];

                if (!companyByYear) {
                    companyById[company.companyCategory.year] = company;
                }
            } else {
                const companyByYear: { [id: number]: CompanyData } = {}

                companyByYear[company.companyCategory.year] = company;

                uniqueCompanies[company.simId] = companyByYear;
            }
        });

        const superUniqueCompanies: CompanyData[] = [];

        Object.keys(uniqueCompanies).forEach(function (key, index) {
            const companyByYear: { [id: number]: CompanyData } = uniqueCompanies[key];

            const companyYears: number[] = Object.keys(companyByYear).map((strKey: string) => {
                return Number(strKey);
            });

            companyYears.sort();
            companyYears.reverse();

            const weightedCompanyYears: number[] = [];

            companyYears.forEach((year: number, index: number) => {
                for (let i: number = 0; i < index + 1; i++) {
                    weightedCompanyYears.push(year);
                }
            });

            let year: number = weightedCompanyYears[Math.floor(Math.random() * weightedCompanyYears.length)];

            const data: { [id: number]: CompanyData } = {};

            const companyData: CompanyData = uniqueCompanies[key][year];

            data[companyData.companyCategory.year] = companyData;

            superUniqueCompanies.push(companyData);
        });


        return superUniqueCompanies;
    }


    private static nFormatter(num: number): string {
        if (Math.abs(num) >= 1000) {
            let numberFormatter = new Intl.NumberFormat('en-us', {minimumFractionDigits: 0, maximumFractionDigits: 0});

            return numberFormatter.format(num / 1000000);
        }

        return num.toString();
    }
}

export class CompanyDataByYear {
    public year: number = 0;
    public revenues: number = 0;
    public sellingGeneralAndAdministrative: number = 0;
    public incomeFromContinuingOperations: number = 0;
    public receivablesNet: number = 0;
    public totalCurrentAssets: number = 0;
    public propertyPlantAndEquipmentNet: number = 0;
    public totalAssets: number = 0;
    public totalCurrentLiabilities: number = 0;
    public totalDebt: number = 0;
    public depreciationAmortisation: number = 0;
    public operatingCashFlow: number = 0;
    public grossMargin: number = 0;
    public debtToAssetRatio: number = 0;
    public currentRatio: number = 0;
    public returnOnAssets: number = 0;

    public EBIT: number = 0;
    public CashAndCashEquivalents: number = 0;
    public CurrentDebt: number = 0;
    public TotalLiabilities: number = 0;
    public PreferredEquity: number = 0;
    public NetIncome: number = 0;
    public DividendsPaid: number = 0;


    public sRevenues: string = '';
    public sSellingGeneralAndAdministrative: string = '';
    public sIncomeFromContinuingOperations: string = '';
    public sReceivablesNet: string = '';
    public sTotalCurrentAssets: string = '';
    public sPropertyPlantAndEquipmentNet: string = '';
    public sTotalAssets: string = '';
    public sTotalCurrentLiabilities: string = '';
    public sTotalDebt: string = '';
    public sDepreciationAmortisation: string = '';
    public sOperatingCashFlow: string = '';
    public sGrossMargin: string = '';
    public sDebtToAssetRatio: string = '';
    public sCurrentRatio: string = '';
    public sReturnOnAssets: string = '';

    constructor(year: number) {
        this.year = year;
    }
}


export class CompanyCategory {
    public year: number = 0;
    public maxCompanies: number = 0;
    public category: Category = 0;
    public categoryName: string = '';
    public companies: CompanyData[] = [];
    public rawData: any[] = [];
    public filteredCompanies: CompanyData[] = [];
    public companiesByYear: { [key: number]: CompanyData[] } = null;
    public companiesByYear75: { [key: number]: CompanyData } = null;

    constructor(category: Category) {
        this.category = category;
        this.categoryName = CategoryNames[category];
    }

    public static filterCategories(categories: CompanyCategory[]): CompanyCategory[] {
        let companies: CompanyData[] = [];

        const categoriesById: { [id: number]: CompanyCategory } = {};

        const filterRules: {} = {
            [Category.BasicMaterials]: 20,
            [Category.ConsumerCyclical]: 10,
            [Category.ConsumerDefensive]: 20,
            [Category.Energy]: 20,
            [Category.Healthcare]: 28,
            [Category.Industrials]: 30,
            [Category.Technology]: 43,
        };

        categories.forEach((category: CompanyCategory) => {
            const numberOfCompanies = filterRules[category.category];

            if (numberOfCompanies > 0) {
                category.maxCompanies = numberOfCompanies;
                category.companies.forEach((company: CompanyData) => {
                    company.companyCategory = category;
                });
                category.filteredCompanies = [];

                companies = companies.concat(category.companies);

                categoriesById[category.category] = category;
            }
        });

        const uniqueCompanies: CompanyData[] = CompanyData.filterCompaniesByYear(companies);

        uniqueCompanies.forEach((companyData: CompanyData) => {
            const category: CompanyCategory = categoriesById[companyData.companyCategory.category];
            if (category && category.filteredCompanies.length <= category.maxCompanies) {
                category.filteredCompanies.push(companyData);
            }
        });

        let filteredCategories: CompanyCategory[] = [];

        Object.keys(categoriesById).forEach((key: any) => {
            const category: CompanyCategory = categoriesById[key];

            category.filteredCompanies = category.filteredCompanies.sort((a: CompanyData, b: CompanyData) => {
                if (a.marketCap > b.marketCap) {
                    return -1;
                } else if (a.marketCap < b.marketCap) {
                    return 1;
                }

                return 0;
            });

            filteredCategories.push(category);
        });

        filteredCategories.sort((a: CompanyCategory, b: CompanyCategory) => {
            if (a.filteredCompanies.length < b.filteredCompanies.length) {
                return 1;
            }

            return 0;
        });

        console.log(filteredCategories);

        return filteredCategories;
    }

    public static filterCategoriesByYear(categories: CompanyCategory[]): CompanyCategory[] {
        const filteredCategories: { [key: number]: CompanyCategory } = {};

        categories.forEach((category: CompanyCategory) => {
            if (category.companies.length) {
                if (!filteredCategories[category.category]) {
                    filteredCategories[category.category] = category;
                }

                const filteredCategory: CompanyCategory = filteredCategories[category.category];

                if (!filteredCategory.companiesByYear) {
                    filteredCategory.companiesByYear = {};
                }

                category.companies.forEach((company: CompanyData) => {
                    CompanyData.calculateRevenueChange(company);

                    const year: number = company.currentYearData.year;

                    if (!filteredCategory.companiesByYear[year]) {
                        filteredCategory.companiesByYear[year] = [];
                    }

                    filteredCategory.companiesByYear[year].push(company);
                });

                filteredCategories[category.category] = filteredCategory;
            }
        });

        const filteredCategoriesArr: CompanyCategory [] = [];

        Object.keys(filteredCategories).forEach((value: any) => {
            const category: CompanyCategory = filteredCategories[value];

            const newCompaniesByYear: { [key: number]: CompanyData[] } = {};
            const newCompaniesByYear75: { [key: number]: CompanyData } = {};

            Object.keys(category.companiesByYear).forEach((value: any) => {
                let array: CompanyData[] = category.companiesByYear[value];

                if (array.length > 1) {
                    array = array.sort((a: CompanyData, b: CompanyData) => {
                        if (a.revenueChange > b.revenueChange) {
                            return 1;
                        } else {
                            return -1;
                        }
                    });

                    newCompaniesByYear[value] = array;

                    const position: number = Math.round(array.length / 100 * 75);

                    newCompaniesByYear75[value] = array[position - 1];
                }
            });


            category.companiesByYear = newCompaniesByYear;
            category.companiesByYear75 = newCompaniesByYear75;

            console.log(category)

            filteredCategoriesArr.push(filteredCategories[value]);
        });

        return filteredCategoriesArr
    }

    public static categoriesToJson(categories: CompanyCategory[]): any[] {
        const catJson: any[] = [[
            '',
            'Revenues', '',
            'Selling general and administrative', '',
            'Income from continuing operations', '',
            'Receivables Net', '',
            'Total Current Assets', '',
            'Property Plant And Equipment Net', '',
            'Total Assets', '',
            'Total Current Liabilities', '',
            'Total Debt', '',
            'Depreciation Amortisation', '',
            'Operating Cash Flow', '',
            'Gross Margin', '',
            'Debt To Asset Ratio', '',
            'Market capitalization',
            'Current ratio', '',
            'Return on assets', '',
        ]];

        categories.forEach((category: CompanyCategory) => {

            catJson.push(['']);

            catJson.push([`${category.categoryName}`,
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                "",
                'first year', 'last year',
                'first year', 'last year',
            ]);

            category.filteredCompanies.forEach((company: CompanyData) => {
                const companyArray: any[] = [];

                companyArray.push(`${company.name} (${company.currentYearData.year} - ${company.nextYearData.year})`);

                companyArray.push(company.currentYearData.sRevenues);
                companyArray.push(company.nextYearData.sRevenues);

                companyArray.push(company.currentYearData.sSellingGeneralAndAdministrative);
                companyArray.push(company.nextYearData.sSellingGeneralAndAdministrative);

                companyArray.push(company.currentYearData.sIncomeFromContinuingOperations);
                companyArray.push(company.nextYearData.sIncomeFromContinuingOperations);


                companyArray.push(company.currentYearData.sReceivablesNet);
                companyArray.push(company.nextYearData.sReceivablesNet);

                companyArray.push(company.currentYearData.sTotalCurrentAssets);
                companyArray.push(company.nextYearData.sTotalCurrentAssets);

                companyArray.push(company.currentYearData.sPropertyPlantAndEquipmentNet);
                companyArray.push(company.nextYearData.sPropertyPlantAndEquipmentNet);

                companyArray.push(company.currentYearData.sTotalAssets);
                companyArray.push(company.nextYearData.sTotalAssets);

                companyArray.push(company.currentYearData.sTotalCurrentLiabilities);
                companyArray.push(company.nextYearData.sTotalCurrentLiabilities);

                companyArray.push(company.currentYearData.sTotalDebt);
                companyArray.push(company.nextYearData.sTotalDebt);

                companyArray.push(company.currentYearData.sDepreciationAmortisation);
                companyArray.push(company.nextYearData.sDepreciationAmortisation);

                companyArray.push(company.currentYearData.sOperatingCashFlow);
                companyArray.push(company.nextYearData.sOperatingCashFlow);

                companyArray.push(company.currentYearData.sGrossMargin);
                companyArray.push(company.nextYearData.sGrossMargin);

                companyArray.push(company.currentYearData.sDebtToAssetRatio);
                companyArray.push(company.nextYearData.sDebtToAssetRatio);

                companyArray.push(company.sMarketCap);

                companyArray.push(company.currentYearData.sCurrentRatio);
                companyArray.push(company.nextYearData.sCurrentRatio);

                companyArray.push(company.currentYearData.sReturnOnAssets);
                companyArray.push(company.nextYearData.sReturnOnAssets);

                catJson.push(companyArray);
            });
        });

        return catJson;
    }

    public static categoriesCalculatedToJson(categories: CompanyCategory[]): any[] {

        const names: any[] = ['Company name:',];

        const DSR: any[] = ['DSR:'];
        const GMI: any[] = ['GMI:'];
        const AQI: any[] = ['AQI:'];
        const SGI: any[] = ['SGI:'];
        const DEPI: any[] = ['DEPI:'];
        const SGAI: any[] = ['SGAI:'];
        const Accruals: any[] = ['Accruals:'];
        const LEVI: any[] = ['LEVI:'];
        const TLTA: any[] = ['TLTA:'];
        const SATA: any[] = ['SATA:'];
        const LOGTA: any[] = ['LOGTA:'];
        const CATA: any[] = ['CATA:'];


        categories.forEach((category: CompanyCategory) => {
            if (category.filteredCompanies.length > 0) {
                category.filteredCompanies.forEach((company: CompanyData) => {
                    names.push(company.name);

                    CompanyData.calculateLastVars(company);

                    DSR.push(company.DSR);
                    GMI.push(company.GMI);
                    AQI.push(company.AQI);
                    SGI.push(company.SGI);
                    DEPI.push(company.DEPI);
                    SGAI.push(company.SGAI);
                    Accruals.push(company.Accruals);
                    LEVI.push(company.LEVI);
                    TLTA.push(company.TLTA);
                    SATA.push(company.SATA);
                    LOGTA.push(company.LOGTA);
                    CATA.push(company.CATA);
                });
            }
        });

        return [names, DSR, GMI, AQI, SGI, DEPI, SGAI, Accruals, LEVI, TLTA, SATA, LOGTA, CATA];
    }

    public static categoriesMedianToJson(categories: CompanyCategory[]): any[] {
        let companies: CompanyData[] = [];

        categories.forEach((category: CompanyCategory) => {
            if (category.filteredCompanies.length > 0) {
                companies = companies.concat(category.filteredCompanies);
            }
        });

        const assets: number[] = [];
        const sales: number[] = [];
        const marketCap: number[] = [];

        const wCapToTotalAssel: number[] = [];
        const currentRatio: number[] = [];
        const totalDebtToTotalAssets: number[] = [];

        const returnOnAssets: number[] = [];
        const salesGrowth: number[] = [];

        companies.forEach((companyData: CompanyData) => {
            assets.push(companyData.currentYearData.totalAssets);
            assets.push(companyData.nextYearData.totalAssets);

            sales.push(companyData.currentYearData.revenues);
            sales.push(companyData.nextYearData.revenues);

            marketCap.push(companyData.marketCap);

            wCapToTotalAssel.push((companyData.currentYearData.totalCurrentAssets - companyData.currentYearData.totalCurrentLiabilities) / companyData.currentYearData.totalAssets);
            wCapToTotalAssel.push((companyData.nextYearData.totalCurrentAssets - companyData.nextYearData.totalCurrentLiabilities) / companyData.nextYearData.totalAssets);

            currentRatio.push(companyData.currentYearData.currentRatio);
            currentRatio.push(companyData.nextYearData.currentRatio);

            totalDebtToTotalAssets.push(companyData.currentYearData.debtToAssetRatio);
            totalDebtToTotalAssets.push(companyData.nextYearData.debtToAssetRatio);

            returnOnAssets.push(companyData.currentYearData.returnOnAssets);
            returnOnAssets.push(companyData.nextYearData.returnOnAssets);

            salesGrowth.push((companyData.nextYearData.revenues - companyData.currentYearData.revenues) / companyData.currentYearData.revenues);
        });

        console.log('sales:', JSON.stringify(sales));

        console.log('Average sales = ', this.average(sales));

        return [
            ['', 'Mean', 'Median'],
            ['Size', '', ''],
            ['Assets', this.nFormatter(this.average(assets)), this.nFormatter(this.median(assets))],
            ['Sales', this.nFormatter(this.average(sales)), this.nFormatter(this.median(sales))],
            ['Market Value', this.nFormatter(this.average(marketCap)), this.nFormatter(this.median(marketCap))],
            ['', '', ''],
            ['Leverage/liquidity', '', ''],
            ['Working capital to total assets', (this.average(wCapToTotalAssel)).toString(), (this.median(wCapToTotalAssel)).toString()],
            ['Current ratio', (this.average(currentRatio)).toString(), (this.median(currentRatio)).toString()],
            ['Total debt to total assets', (this.average(totalDebtToTotalAssets)).toString(), (this.median(totalDebtToTotalAssets)).toString()],
            ['', '', ''],
            ['Profitability/Growth', '', ''],
            ['Return on assets', (this.average(returnOnAssets)).toString(), (this.median(returnOnAssets)).toString()],
            ['Sales Growth', this.average(salesGrowth).toString(), this.median(salesGrowth).toString()],
        ];
    }

    public static categoriesMedianRevenueToJson(categories: CompanyCategory[]): any[] {
        let firstYear: number = 2000000;

        let lastYear: number = 0;

        categories.forEach((category: CompanyCategory) => {
            if (category.companiesByYear75) {
                Object.keys(category.companiesByYear75).forEach((value: any) => {
                    if (value < firstYear) {
                        firstYear = value;
                    }

                    if (value > lastYear) {
                        lastYear = value;
                    }
                });
            }
        });

        const firstRow: string[] = ['Industry/Year'];

        const years: number[] = [];

        const rows: string[][] = [firstRow];

        for (let i: number = firstYear; i <= lastYear; i++) {
            years.push(i);

            firstRow.push(i.toString());
        }

        categories.forEach((category: CompanyCategory) => {

            console.log('categories = ', category.categoryName);
            if (category.companiesByYear75) {
                const categoryRow: string[] = [category.categoryName];

                years.forEach((year: number) => {
                    const company: CompanyData = category.companiesByYear75[year];
                    if (company) {
                        categoryRow.push(company.revenueChange.toString());

                    } else {
                        categoryRow.push("---");
                    }
                });

                rows.push(categoryRow);
            }
        });


        return rows;
    }

    private static nFormatter(num: number): string {
        if (Math.abs(num) >= 1000) {
            let numberFormatter = new Intl.NumberFormat('en-us', {minimumFractionDigits: 0, maximumFractionDigits: 0});

            return numberFormatter.format(num / 1000000);
        }

        return num.toString();
    }

    public static median(values: number[]) {
        values.sort(function (a, b) {
            return a - b;
        });

        if (values.length === 0) return 0;

        let half = Math.floor(values.length / 2);

        if (values.length % 2)
            return values[half];
        else
            return (values[half - 1] + values[half]) / 2.0;
    }

    public static average(values: number[]) {
        let sum = 0;
        let avg = 0;

        if (values.length) {
            sum = values.reduce(function (a, b) {
                return a + b;
            });

            console.log('sum = ', sum, "number of companies = ", values.length);

            avg = sum / values.length;
        }

        return avg;
    }
}