import { FC, LegacyRef, useEffect, useRef, useState } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import Container from "react-bootstrap/Container";

import { IPerson, IPersonRequest } from "../../store/models/IPerson";
import { useGetPersonsMutation } from "../../store/services/person.service";

import styles from './main.module.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InfiniteScroll from "react-infinite-scroll-component";
import { Table } from "react-bootstrap";
import { RandomIcon } from "./icons";

const MainScreen: FC = () => {
    const [locale, setLocale] = useState<string>('0');
    const [persons, setPersons] = useState<IPerson[]>([]);
    const [seed, setSeed] = useState<number>(99999);
    const [recordsCount, setRecordsCount] = useState<number>(20);
    const [errorOffset, setErrorOffset] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const rangeRef = useRef<HTMLInputElement>(null);
    const errorInputRef = useRef<HTMLInputElement>(null);

    const infiniteScroll: LegacyRef<InfiniteScroll> = useRef(null);

    const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        setSeed(Number(value));
        handleClear(Number(value), errorOffset, locale);
    }

    const handleChangePageNum = (pageNum: number) => {
        setPage(pageNum);
    }

    const handleChangeLocale = ({ target: { name, value } }: React.ChangeEvent<HTMLSelectElement>) => {
        setLocale(value);
        handleClear(seed, errorOffset, value);
    }

    const [getPersons, {error, isLoading}] = useGetPersonsMutation();

    const handleGetPersons = async () => {
        const reqData: IPersonRequest = {locale: locale, fakerSeed: seed, pageNumber: page, recordsCount: recordsCount, errorOffset: errorOffset};
        handleChangePageNum(page + 1);
        const pers = await getPersons(reqData).unwrap();
        setPersons([...persons, ...pers]);
    }

    async function handleClear(seed: number, errors: number, localeS: string) {
        handleChangePageNum(2);
        const reqData: IPersonRequest = {locale: localeS, fakerSeed: seed, pageNumber: 1, recordsCount: recordsCount, errorOffset: errors};
        const pers = await getPersons(reqData).unwrap();
        setPersons([...pers]);
    }

    const randomize = () => {
        const randomSeed = Math.floor(Math.random() * (9999999))
        setSeed(randomSeed);
        handleClear(randomSeed, errorOffset, locale);
    }

    const handleCheckRangeValue = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        setErrorOffset(Number(value));
        if(errorInputRef.current) 
            errorInputRef.current.value = value;
    }

    const handleSubmitRangeValue = () => {
        handleClear(seed, errorOffset, locale);
    }

    const handleErrorInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        if(rangeRef.current)
            rangeRef.current.value = Math.min(Number(value), 10).toString();
        setErrorOffset(Number(value));
        handleClear(seed, Number(value), locale);
    }

    const headers = [
        { label: "num", key: "num" },
        { label: "id", key: "id" },
        { label: "fullName", key: "fullName" },
        { label: "adress", key: "adress" },
        { label: "phone", key: "phone" }
    ];

    useEffect(() => {
        handleGetPersons();
    }, [])

    return <Container className={styles.container}>
        <div className={styles.toolbar}>

            <div className={styles.formGroup}>
                Locale
                <Form.Select value={locale} onChange={handleChangeLocale}>
                    <option value="0">English (USA)</option>
                    <option value="1">Russian (RU)</option>
                    <option value="2">Polish (PL)</option>
                </Form.Select>
            </div>

            <div className={styles.formGroup}>
                Seed
                <Form.Control name="fakerSeed" onChange={handleChange} value={seed} type="number" />
                <Button variant='light' onClick={randomize}><RandomIcon /></Button>
            </div>

            <div className={styles.formGroup}>
                Errors
                <Form.Range ref={rangeRef} onMouseUp={handleSubmitRangeValue} onChange={handleCheckRangeValue} value={errorOffset} step={0.25} max={10} />
                <Form.Control ref={errorInputRef} name="errorInput" onChange={handleErrorInputChange} type="number" />
            </div>

            <div className={styles.formGroup}>
                <CSVLink data={persons} headers={headers} className='btn btn-primary'>Export to CSV</CSVLink>
            </div>
        </div>
        
        <div className={styles.formGroup}>
            {isLoading ? 
                    <>
                        <span className={styles.loader}></span>
                    </>
                    :
                    <>
                        <span className={styles.disabledLoader}></span>
                    </>
                }
        </div>


        <InfiniteScroll
            ref={infiniteScroll}
            dataLength={persons.length}
            next={handleGetPersons}
            hasMore={true}
            loader={<div>Loading...</div>}
        >
            <Table>
                <thead>
                    <tr>
                        <th className={`${styles.cellItem} ${styles.bodyTd}`}>#</th>
                        <th className={`${styles.cellItem} ${styles.bodyTd}`}>Id</th>
                        <th className={`${styles.cellItem} ${styles.bodyTd}`}>Full name</th>
                        <th className={`${styles.cellItem} ${styles.bodyTd}`}>Adress</th>
                        <th className={`${styles.cellItem} ${styles.bodyTd}`}>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {persons.map((item) => (
                        <tr key={item.id} className={styles.bodyTr}>
                            <td className={styles.bodyTd}>
                                <div className={styles.cellItem}>{item.num}</div>    
                            </td>
                            <td className={styles.bodyTd}>
                                <div className={styles.cellItem}>{item.id}</div>
                            </td>
                            <td className={styles.bodyTd}>
                                <div className={styles.cellItem}>{item.fullName}</div>    
                            </td>
                            <td className={styles.bodyTd}>
                                <div className={styles.cellItem}>{item.adress}</div>    
                            </td>
                            <td className={styles.bodyTd}>
                                <div className={styles.cellItem}>{item.phone}</div>    
                            </td>
                        </tr>
                    ))};
                </tbody>
            </Table>
        </InfiniteScroll>        
    </Container>
}

export default MainScreen;