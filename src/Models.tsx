import { nFormatter } from "./Misc";
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
    public category: Category = 0;
    public categoryName: string = '';
    public companies: CompanyData[] = [];

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
            ]);

            //     category.companies.forEach((company: CompanyData) => {
            //
            //         const years: CompanyValuesByYear[] = [];
            //
            //         Object.keys(company.years).forEach((yearKey: any) => {
            //             const year: CompanyValuesByYear = company.years[yearKey];
            //
            //             years.push(year);
            //         });
            //
            //         const companyArray: any[] = [];
            //
            //         companyArray.push(`${company.name} (${company.currentYearData.year} - ${company.nextYearData.year})`);
            //
            //         companyArray.push(company.currentYearData.sRevenues);
            //         companyArray.push(company.nextYearData.sRevenues);
            //
            //         companyArray.push(company.currentYearData.sSellingGeneralAndAdministrative);
            //         companyArray.push(company.nextYearData.sSellingGeneralAndAdministrative);
            //
            //         companyArray.push(company.currentYearData.sIncomeFromContinuingOperations);
            //         companyArray.push(company.nextYearData.sIncomeFromContinuingOperations);
            //
            //
            //         companyArray.push(company.currentYearData.sReceivablesNet);
            //         companyArray.push(company.nextYearData.sReceivablesNet);
            //
            //         companyArray.push(company.currentYearData.sTotalCurrentAssets);
            //         companyArray.push(company.nextYearData.sTotalCurrentAssets);
            //
            //         companyArray.push(company.currentYearData.sPropertyPlantAndEquipmentNet);
            //         companyArray.push(company.nextYearData.sPropertyPlantAndEquipmentNet);
            //
            //         companyArray.push(company.currentYearData.sTotalAssets);
            //         companyArray.push(company.nextYearData.sTotalAssets);
            //
            //         companyArray.push(company.currentYearData.sTotalCurrentLiabilities);
            //         companyArray.push(company.nextYearData.sTotalCurrentLiabilities);
            //
            //         companyArray.push(company.currentYearData.sTotalDebt);
            //         companyArray.push(company.nextYearData.sTotalDebt);
            //
            //         companyArray.push(company.currentYearData.sDepreciationAmortisation);
            //         companyArray.push(company.nextYearData.sDepreciationAmortisation);
            //
            //         companyArray.push(company.currentYearData.sOperatingCashFlow);
            //         companyArray.push(company.nextYearData.sOperatingCashFlow);
            //
            //         companyArray.push(company.currentYearData.sGrossMargin);
            //         companyArray.push(company.nextYearData.sGrossMargin);
            //
            //         companyArray.push(company.currentYearData.sDebtToAssetRatio);
            //         companyArray.push(company.nextYearData.sDebtToAssetRatio);
            //
            //         companyArray.push(company.sMarketCap);
            //
            //         companyArray.push(company.currentYearData.sCurrentRatio);
            //         companyArray.push(company.nextYearData.sCurrentRatio);
            //
            //         companyArray.push(company.currentYearData.sReturnOnAssets);
            //         companyArray.push(company.nextYearData.sReturnOnAssets);
            //
            //         catJson.push(companyArray);
            //     });
        });

        return catJson;
    }
}


export class CompanyData {
    public simId: number = 0;
    public name: string = '';
    public years: { [key: number]: CompanyValuesByYear } = {};
}

export class CompanyValuesByYear {
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
    public NetIncome: number = 0;
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
