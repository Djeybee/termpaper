import { average, median, nFormatter } from "./Misc";
import { OverscrollBehaviorProperty } from "csstype";

export enum Indicator {
    NameOfCompany,
    Revenues,
    SellingGeneralAndAdministrative,
    IncomeFromContinuingOperations,
    ReceivablesNet,
    TotalCurrentAssets,
    PropertyPlantAndEquipmentNet,
    TotalAssets,
    TotalCurrentLiabilities,
    TotalDebt,
    DepreciationAmortisation,
    OperatingCashFlow,
    GrossMargin,
    DebtToAssetRatio,
    MarketCapitalization,
    CurrentRatio,
    ReturnOnAssets,
    EBIT,
    CashAndCashEquivalents,
    CurrentDebt,
    TotalLiabilities,
    PreferredEquity,
    NetIncome,
    DividendsPaid
}

export enum Category {
    Industrials,
    Technology,
    ConsumerDefensive,
    ConsumerCyclical,
    Utilities,
    Healthcare,
    Energy,
    BusinessServices,
    RealEstate,
    BasicMaterials,
    Other,
    CommunicationServices
}


export const CategoryNames = {
    [Category.Industrials]: 'Industrials',
    [Category.Technology]: 'Technology',
    [Category.ConsumerDefensive]: 'Consumer Defensive',
    [Category.ConsumerCyclical]: 'Consumer Cyclical',
    [Category.Utilities]: 'Utilities',
    [Category.Healthcare]: 'Healthcare',
    [Category.Energy]: 'Energy',
    [Category.BusinessServices]: 'Business Services',
    [Category.RealEstate]: 'Real Estate',
    [Category.BasicMaterials]: 'Basic Materials',
    [Category.Other]: 'Other',
    [Category.CommunicationServices]: 'Communication Services'
};

export class CompanyCategoryParsed {
    //local
    public filteredCompanies: CompanyData[] = [];
    //local

    public category: Category = 0;
    public categoryName: string = '';
    public companies: CompanyData[] = [];
    public quantile: { [key: number]: number } = {}

    constructor(category: Category) {
        this.category = category;
        this.categoryName = CategoryNames[category];
    }

    public static categoriesToJson(categories: CompanyCategoryParsed[]): any[] {
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
            'EBIT', '',
            'Cash and cash equivalents', '',
            'Current debt', '',
            'Total Liabilities', '',
            'Preferred equity', '',
            'Net income', '',
            'Dividends paid', '',
        ]];


        categories.forEach((category: CompanyCategoryParsed) => {

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
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
                'first year', 'last year',
            ]);

            category.companies.forEach((company: CompanyData) => {
                const companyArray: any[] = [];

                console.log(company);

                companyArray.push(`${company.name} (${company.prevYear.year} - ${company.currentYear.year})`);

                companyArray.push(company.prevYear.sRevenues);
                companyArray.push(company.currentYear.sRevenues);

                companyArray.push(company.prevYear.sSellingGeneralAndAdministrative);
                companyArray.push(company.currentYear.sSellingGeneralAndAdministrative);

                companyArray.push(company.prevYear.sIncomeFromContinuingOperations);
                companyArray.push(company.currentYear.sIncomeFromContinuingOperations);


                companyArray.push(company.prevYear.sReceivablesNet);
                companyArray.push(company.currentYear.sReceivablesNet);

                companyArray.push(company.prevYear.sTotalCurrentAssets);
                companyArray.push(company.currentYear.sTotalCurrentAssets);

                companyArray.push(company.prevYear.sPropertyPlantAndEquipmentNet);
                companyArray.push(company.currentYear.sPropertyPlantAndEquipmentNet);

                companyArray.push(company.prevYear.sTotalAssets);
                companyArray.push(company.currentYear.sTotalAssets);

                companyArray.push(company.prevYear.sTotalCurrentLiabilities);
                companyArray.push(company.currentYear.sTotalCurrentLiabilities);

                companyArray.push(company.prevYear.sTotalDebt);
                companyArray.push(company.currentYear.sTotalDebt);

                companyArray.push(company.prevYear.sDepreciationAmortisation);
                companyArray.push(company.currentYear.sDepreciationAmortisation);

                companyArray.push(company.prevYear.sOperatingCashFlow);
                companyArray.push(company.currentYear.sOperatingCashFlow);

                companyArray.push(company.prevYear.sGrossMargin);
                companyArray.push(company.currentYear.sGrossMargin);

                companyArray.push(company.prevYear.sDebtToAssetRatio);
                companyArray.push(company.currentYear.sDebtToAssetRatio);

                companyArray.push(company.currentYear.sMarketCap);

                companyArray.push(company.prevYear.sCurrentRatio);
                companyArray.push(company.currentYear.sCurrentRatio);

                companyArray.push(company.prevYear.sReturnOnAssets);
                companyArray.push(company.currentYear.sReturnOnAssets);

                companyArray.push(company.prevYear.sEBIT);
                companyArray.push(company.currentYear.sEBIT);

                companyArray.push(company.prevYear.sCashAndCashEquivalents);
                companyArray.push(company.currentYear.sCashAndCashEquivalents);

                companyArray.push(company.prevYear.sCurrentDebt);
                companyArray.push(company.currentYear.sCurrentDebt);

                companyArray.push(company.prevYear.sTotalLiabilities);
                companyArray.push(company.currentYear.sTotalLiabilities);

                companyArray.push(company.prevYear.sPreferredEquity);
                companyArray.push(company.currentYear.sPreferredEquity);

                companyArray.push(company.prevYear.sNetIncome);
                companyArray.push(company.currentYear.sNetIncome);

                companyArray.push(company.prevYear.sDividendsPaid);
                companyArray.push(company.currentYear.sDividendsPaid);

                catJson.push(companyArray);
            });
        });

        return catJson;
    }


    public static categoriesCalculatedToJson(categories: CompanyCategoryParsed[]): any[] {
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
        const ALTMAN_Z_SCORE: any[] = ['ALTMAN Z SCORE:'];
        const GROWTH: any[] = ['GROWTH:'];
        const RSST_ACC: any[] = ['RSST_ACC:'];
        const CH_REC: any[] = ['CH_REC:'];
        const SOFT_ASSETS: any[] = ['SOFT_ASSETS:'];
        const CH_CS: any[] = ['CH_CS:'];
        const CH_ROA: any[] = ['CH_ROA:'];
        const CH_INV: any[] = ['CH_INV:'];
        const REVENUE: any[] = ['REVENUE:'];

        categories.forEach((category: CompanyCategoryParsed) => {
            category.companies.forEach((company: CompanyData) => {
                names.push(company.name);

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
                ALTMAN_Z_SCORE.push(company.ALTMAN_Z_SCORE);
                GROWTH.push(company.GROWTH);
                RSST_ACC.push(company.RSST_ACC);
                CH_REC.push(company.CH_REC);
                SOFT_ASSETS.push(company.SOFT_ASSETS);
                CH_CS.push(company.CH_CS);
                CH_ROA.push(company.CH_ROA);
                CH_INV.push(company.CH_INV);
                REVENUE.push(company.currentYear.revenues);
            });
        });

        return [names, DSR, GMI, AQI, SGI, DEPI, SGAI, Accruals, LEVI, TLTA, SATA, LOGTA, CATA, ALTMAN_Z_SCORE, GROWTH, RSST_ACC, CH_REC, SOFT_ASSETS, CH_CS, CH_ROA, CH_INV, [' '], REVENUE];
    }


    public static filterCompaniesForDSR(category: CompanyCategoryParsed): CompanyData[] {
        const filteredCompanies: CompanyData[] = [];

        const filterRules: {} = {
            [Category.BasicMaterials]: 20,
            [Category.ConsumerCyclical]: 10,
            [Category.ConsumerDefensive]: 20,
            [Category.Energy]: 20,
            [Category.Healthcare]: 28,
            [Category.Industrials]: 30,
            [Category.Technology]: 43,
        };

        const maxNumberOfCompanies = filterRules[category.category];

        category.companies.forEach((company: CompanyData) => {
            if (filteredCompanies.length < maxNumberOfCompanies) {
                filteredCompanies.push(company);
            }
        });

        return filteredCompanies;
    }

    public static categoriesMedianToJson(categories: CompanyCategoryParsed[]): any[] {
        let companies: CompanyData[] = [];

        categories.forEach((category: CompanyCategoryParsed) => {
            companies = companies.concat(category.filteredCompanies);
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
            assets.push(companyData.currentYear.totalAssets);

            sales.push(companyData.currentYear.revenues);

            marketCap.push(companyData.currentYear.marketCap);

            wCapToTotalAssel.push((companyData.currentYear.totalCurrentAssets - companyData.currentYear.totalCurrentLiabilities) / companyData.currentYear.totalAssets);

            currentRatio.push(companyData.currentYear.currentRatio);

            totalDebtToTotalAssets.push(companyData.currentYear.debtToAssetRatio);

            returnOnAssets.push(companyData.currentYear.returnOnAssets);

            salesGrowth.push((companyData.currentYear.revenues - companyData.prevYear.revenues) / companyData.prevYear.revenues);
        });

        console.log('sales:', JSON.stringify(sales));

        console.log('Average sales = ', average(sales));

        return [
            ['', 'Mean', 'Median'],
            ['Size', '', ''],
            ['Assets', nFormatter(average(assets)), nFormatter(median(assets))],
            ['Sales', nFormatter(average(sales)), nFormatter(median(sales))],
            ['Market Value', nFormatter(average(marketCap)), nFormatter(median(marketCap))],
            ['', '', ''],
            ['Leverage/liquidity', '', ''],
            ['Working capital to total assets', (average(wCapToTotalAssel)).toString(), (median(wCapToTotalAssel)).toString()],
            ['Current ratio', (average(currentRatio)).toString(), (median(currentRatio)).toString()],
            ['Total debt to total assets', (average(totalDebtToTotalAssets)).toString(), (median(totalDebtToTotalAssets)).toString()],
            ['', '', ''],
            ['Profitability/Growth', '', ''],
            ['Return on assets', (average(returnOnAssets)).toString(), (median(returnOnAssets)).toString()],
            ['Sales Growth', average(salesGrowth).toString(), median(salesGrowth).toString()],
        ];
    }

    public static categoriesMedianRevenueToJson(categories: CompanyCategoryParsed[]): any[] {
        let firstYear: number = 2000000;

        let lastYear: number = 0;

        categories.forEach((category: CompanyCategoryParsed) => {
            Object.keys(category.quantile).forEach((value: any) => {
                if (value < firstYear) {
                    firstYear = value;
                }

                if (value > lastYear) {
                    lastYear = value;
                }
            });
        });

        const firstRow: string[] = ['Industry/Year'];

        const years: number[] = [];

        const rows: string[][] = [firstRow];

        for (let i: number = firstYear; i <= lastYear; i++) {
            years.push(i);

            firstRow.push(i.toString());
        }

        categories.forEach((category: CompanyCategoryParsed) => {
            const categoryRow: string[] = [category.categoryName];

            years.forEach((year: number) => {
                const revenueChange: number = category.quantile[year];
                if (revenueChange) {
                    categoryRow.push(nFormatter(revenueChange));
                } else {
                    categoryRow.push("---");
                }
            });

            rows.push(categoryRow);
        });

        return rows;
    }

}


export class CompanyData {
    public simId: number = 0;
    public name: string = '';
    public years: { [key: number]: CompanyValuesByYear } = {};
    public yearsArrayForRevenue: number[] = [];

    public prevPrevYear: CompanyValuesByYear;
    public prevYear: CompanyValuesByYear;
    public currentYear: CompanyValuesByYear;

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
    public GROWTH: number = 0;
    public RSST_ACC: number = 0;
    public CH_REC: number = 0;
    public SOFT_ASSETS: number = 0;
    public CH_CS: number = 0;
    public CH_ROA: number = 0;
    public CH_INV: number = 0;
}

export class CompanyValuesByYear {
    public year: number = 0;

    public marketCap: number = 0;
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
    public EBIT: number = 0;//new
    public cashAndCashEquivalents: number = 0;
    public currentDebt: number = 0;
    public totalLiabilities: number = 0;
    public preferredEquity: number = 0;
    public netIncome: number = 0;
    public dividendsPaid: number = 0;

    public sMarketCap: string = '';
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
    public sEBIT: string = '';//new
    public sCashAndCashEquivalents: string = '';
    public sCurrentDebt: string = '';
    public sTotalLiabilities: string = '';
    public sPreferredEquity: string = '';
    public sNetIncome: string = '';
    public sDividendsPaid: string = '';

}