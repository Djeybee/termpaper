import { nFormatter } from "./Misc";

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
