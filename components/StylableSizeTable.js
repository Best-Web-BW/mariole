export default function StylableSizeTable({ styles, t }) {
    return (
        <table>
            <thead>
                <tr>
                    <td className={styles.row_title}>Mario'le</td>
                    <td className={styles.col_title}>XS</td>
                    <td className={styles.col_title}>S</td>
                    <td className={styles.col_title}>M</td>
                    <td className={styles.col_title}>L</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className={styles.row_title}>{ t("chest-volume") }</td>
                    <td>84</td>
                    <td>88</td>
                    <td>92</td>
                    <td>96</td>
                </tr>
                <tr>
                    <td className={styles.row_title}>{ t("waist-volume") }</td>
                    <td>64</td>
                    <td>68</td>
                    <td>72</td>
                    <td>76</td>
                </tr>
                <tr>
                    <td className={styles.row_title}>{ t("hip-volume") }</td>
                    <td>88</td>
                    <td>92</td>
                    <td>96</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td className={styles.row_title}>{ t("italy") }</td>
                    <td>38</td>
                    <td>40</td>
                    <td>42</td>
                    <td>44</td>
                </tr>
                <tr>
                    <td className={styles.row_title}>{ t("france") }</td>
                    <td>36</td>
                    <td>38</td>
                    <td>40</td>
                    <td>42</td>
                </tr>
            </tbody>
        </table>
    );
}