import * as React from 'react';
import './App.css';

import * as XLSX from 'xlsx';
import { CompanyCategoryParsed, CompanyData } from "./Models";
import { CompanyCategory } from "./OldModels";

var FileSaver = require('file-saver');

var resultsData = require('src/results.json');
var allData = require('src/allData.json');

interface AppProps {
}

interface AppState {
    sheetRaw: any;
    sheetCalculated: any;
    sheetMedian: any;
    sheetMedianRevenue: any;
}

class App extends React.Component<AppProps, AppState> {
    state: AppState = {
        sheetRaw: null,
        sheetCalculated: null,
        sheetMedian: null,
        sheetMedianRevenue: null
    };

    public componentDidMount() {
        var savedRawJson = JSON.parse(localStorage.getItem('rawData'));
        if (savedRawJson) {
            this.setRawJson(savedRawJson);
        }

        var savedCalculatedJson = JSON.parse(localStorage.getItem('calculatedData'));
        if (savedCalculatedJson) {
            this.setCalculatedJson(savedCalculatedJson);
        }

        var savedMedianJson = JSON.parse(localStorage.getItem('medianData'));
        if (savedMedianJson) {
            this.setMedianJson(savedMedianJson);
        }

        var savedMedianRevenueJson = JSON.parse(localStorage.getItem('medianRevenueData'));
        if (savedMedianRevenueJson) {
            this.setMedianRevenueJson(savedMedianRevenueJson);
        }
    }

    public render() {
        let htmlRaw: any = null;
        if (this.state.sheetRaw) {
            htmlRaw = XLSX.utils.sheet_to_html(this.state.sheetRaw);
        }

        let htmlCalculated: any = null;
        if (this.state.sheetCalculated) {
            htmlCalculated = XLSX.utils.sheet_to_html(this.state.sheetCalculated);
        }

        let htmlMedial: any = null;
        if (this.state.sheetMedian) {
            htmlMedial = XLSX.utils.sheet_to_html(this.state.sheetMedian);
        }

        let htmlMedianRevenue: any = null;
        if (this.state.sheetMedianRevenue) {
            htmlMedianRevenue = XLSX.utils.sheet_to_html(this.state.sheetMedianRevenue);
        }

        return (
            <div className="App">
                <div style={{width: 'max-content'}}>
                    {/*<Table categories={this.state.categories}/>*/}
                </div>
                <button
                    onClick={() => {
                    }}>
                    Load data
                </button>

                <button
                    onClick={() => {
                        const categoriesContainer: { [key: number]: CompanyCategoryParsed } = allData as CompanyCategoryParsed[];

                        const categoriesArray: CompanyCategoryParsed[] = [];

                        Object.keys(categoriesContainer).forEach((key: any) => {
                            const category: CompanyCategoryParsed = categoriesContainer[key];

                            category.filteredCompanies = CompanyCategoryParsed.filterCompaniesForDSR(category);

                            categoriesArray.push(categoriesContainer[key]);
                        });

                        if (categoriesContainer) {
                            // const filteredCategories: CompanyCategoryParsed[] = CompanyCategory.filterCategories(categoriesContainer.categories);

                            const catsArray: any[] = CompanyCategoryParsed.categoriesToJson(categoriesArray);
                            localStorage.setItem('rawData', JSON.stringify(catsArray));
                            this.setRawJson(catsArray);

                            const catsArrayCalculated: any[] = CompanyCategoryParsed.categoriesCalculatedToJson(categoriesArray);
                            localStorage.setItem('calculatedData', JSON.stringify(catsArrayCalculated));
                            this.setCalculatedJson(catsArrayCalculated);

                            const catsArrayMedian: any[] = CompanyCategoryParsed.categoriesMedianToJson(categoriesArray);
                            localStorage.setItem('medianData', JSON.stringify(catsArrayMedian));
                            this.setMedianJson(catsArrayMedian);

                            const filteredCategoriesByYear: CompanyCategoryParsed[] = CompanyCategoryParsed.filterCategoriesByYear(categoriesArray);
                            const catsArrayMedianRevenue: any[] = CompanyCategoryParsed.categoriesMedianRevenueToJson(filteredCategoriesByYear);
                            localStorage.setItem('medianRevenueData', JSON.stringify(catsArrayMedianRevenue));
                            this.setMedianRevenueJson(catsArrayMedianRevenue);
                        }
                    }}>
                    Generate tables
                </button>

                <div>
                    <button
                        onClick={() => {
                            if (this.state.sheetRaw) {
                                const wb = XLSX.utils.book_new();

                                XLSX.utils.book_append_sheet(wb, this.state.sheetRaw, "raw");

                                XLSX.writeFile(wb, 'raw.xlsb');
                            }
                        }}>
                        Download raw table
                    </button>
                    <button
                        onClick={() => {
                            if (this.state.sheetCalculated) {
                                const wb = XLSX.utils.book_new();

                                XLSX.utils.book_append_sheet(wb, this.state.sheetCalculated, "calculated");

                                XLSX.writeFile(wb, 'calculated.xlsb');
                            }
                        }}>
                        Download calculated table
                    </button>
                    <button
                        onClick={() => {
                            if (this.state.sheetMedian) {
                                const wb = XLSX.utils.book_new();

                                XLSX.utils.book_append_sheet(wb, this.state.sheetMedian, "median");

                                XLSX.writeFile(wb, 'median.xlsb');
                            }
                        }}>
                        Download median table
                    </button>
                    <button
                        onClick={() => {
                            if (this.state.sheetMedianRevenue) {
                                const wb = XLSX.utils.book_new();

                                XLSX.utils.book_append_sheet(wb, this.state.sheetMedianRevenue, "median revenue");

                                XLSX.writeFile(wb, 'median_revenue.xlsb');
                            }
                        }}>
                        Download median revenue table
                    </button>
                </div>
                <div dangerouslySetInnerHTML={{__html: htmlRaw}}/>
                <div style={{backgroundColor: 'grey', flexGrow: 1, height: 5}}/>
                <div dangerouslySetInnerHTML={{__html: htmlCalculated}}/>
                <div style={{backgroundColor: 'grey', width: '100%', height: 5}}/>
                <div dangerouslySetInnerHTML={{__html: htmlMedial}}/>
                <div style={{backgroundColor: 'grey', width: '100%', height: 5}}/>
                <div dangerouslySetInnerHTML={{__html: htmlMedianRevenue}}/>
            </div>
        );
    }

    private setRawJson(jsonData: any) {
        const sheet = XLSX.utils.json_to_sheet(
            jsonData,
            {skipHeader: true}
        );

        if (!sheet['!merges']) sheet['!merges'] = [];
        sheet['!merges'].push({s: {r: 0, c: 1}, e: {r: 0, c: 2}});
        sheet['!merges'].push({s: {r: 0, c: 3}, e: {r: 0, c: 4}});
        sheet['!merges'].push({s: {r: 0, c: 5}, e: {r: 0, c: 6}});
        sheet['!merges'].push({s: {r: 0, c: 7}, e: {r: 0, c: 8}});
        sheet['!merges'].push({s: {r: 0, c: 9}, e: {r: 0, c: 10}});
        sheet['!merges'].push({s: {r: 0, c: 11}, e: {r: 0, c: 12}});
        sheet['!merges'].push({s: {r: 0, c: 13}, e: {r: 0, c: 14}});
        sheet['!merges'].push({s: {r: 0, c: 15}, e: {r: 0, c: 16}});
        sheet['!merges'].push({s: {r: 0, c: 17}, e: {r: 0, c: 18}});
        sheet['!merges'].push({s: {r: 0, c: 19}, e: {r: 0, c: 20}});
        sheet['!merges'].push({s: {r: 0, c: 21}, e: {r: 0, c: 22}});
        sheet['!merges'].push({s: {r: 0, c: 23}, e: {r: 0, c: 24}});
        sheet['!merges'].push({s: {r: 0, c: 25}, e: {r: 0, c: 26}});
        sheet['!merges'].push({s: {r: 0, c: 28}, e: {r: 0, c: 29}});
        sheet['!merges'].push({s: {r: 0, c: 30}, e: {r: 0, c: 31}});
        sheet['!merges'].push({s: {r: 0, c: 32}, e: {r: 0, c: 33}});
        sheet['!merges'].push({s: {r: 0, c: 34}, e: {r: 0, c: 35}});
        sheet['!merges'].push({s: {r: 0, c: 36}, e: {r: 0, c: 37}});
        sheet['!merges'].push({s: {r: 0, c: 38}, e: {r: 0, c: 39}});
        sheet['!merges'].push({s: {r: 0, c: 40}, e: {r: 0, c: 41}});
        sheet['!merges'].push({s: {r: 0, c: 42}, e: {r: 0, c: 43}});
        sheet['!merges'].push({s: {r: 0, c: 44}, e: {r: 0, c: 45}});

        this.setState({
            sheetRaw: sheet,
        });
    }

    private setCalculatedJson(jsonData: any) {
        const sheet = XLSX.utils.json_to_sheet(
            jsonData,
            {skipHeader: true}
        );

        this.setState({
            sheetCalculated: sheet,
        });
    }

    private setMedianJson(jsonData: any) {
        const sheet = XLSX.utils.json_to_sheet(
            jsonData,
            {skipHeader: true}
        );

        this.setState({
            sheetMedian: sheet,
        });
    }

    private setMedianRevenueJson(jsonData: any) {
        const sheet = XLSX.utils.json_to_sheet(
            jsonData,
            {skipHeader: true}
        );

        this.setState({
            sheetMedianRevenue: sheet,
        });
    }
}

export default App;
