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

            category.companies.forEach((company: CompanyData) => {
                // const years: CompanyValuesByYear[] = [];
                //
                // Object.keys(company.years).forEach((yearKey: any) => {
                //     const year: CompanyValuesByYear = company.years[yearKey];
                //
                //     years.push(year);
                // });

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

                catJson.push(companyArray);
            });
        });

        return catJson;
    }
}


export class CompanyData {
    public simId: number = 0;
    public name: string = '';
    public years: { [key: number]: CompanyValuesByYear } = {};

    public prevPrevYear: CompanyValuesByYear;
    public prevYear: CompanyValuesByYear;
    public currentYear: CompanyValuesByYear;
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
