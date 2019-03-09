import React, { Component } from 'react';
import { View, StyleSheet, TouchableNativeFeedback, TextInput, Alert } from 'react-native'
import {
    Container,
    Content,
    List,
    ListItem,
    Text,
    Left,
    Right,
    Input,
    Button,
    CheckBox,
    Body,
    Label,
    Picker,
    Icon,
    Spinner,
} from 'native-base';
import { Query, Mutation } from 'react-apollo'
import { withNavigation } from 'react-navigation'

import Region from '../Region'
import {display} from '../../utils/tools'
import { grades, errorMessage, educations } from '../../utils/tools'
import ADD_LOCATION from '../../graphql/add_location.mutation'
import GET_NEWSCHOOL from '../../graphql/get_newSchool.query'
import GET_NEWGRADEANDCLASSES from '../../graphql/get_newGradeAndClasses.query'
import GET_NEWMAJOR from '../../graphql/get_newMajor.query'
import ADD_STUDY from '../../graphql/add_study.mutation'
import GET_ME from '../../graphql/get_me.query'

class Study extends Component {
    state = {
        selected: "0",
        startYear: '',
        endYear: '',
        location: {},
        hasMajor: false,
        disabled: true,
    }

    componentDidUpdate

    onValueChange = (value) => {
        this.setState({
            selected: value,
        });
        if (!!~['PrimarySchool', 'JuniorMiddleSchool', 'HighSchool'].indexOf(value)) {
            this.setState({ hasMajor: false })
        }
        if (!!~['VocationalHighSchool', 'TechnicalSchool', 'SecondarySpecializedSchool',
            'JuniorCollege', 'Undergraduate', 'Master', 'Doctor', 'JuniorToCollege', 'HighToCollege', 'HighToJunior'
        ].indexOf(value)) {
            this.setState({ hasMajor: true })
        }

        this.setState({ location: {}, startYear: "", endYear: "" })
    }

    _getnewLocation = (place, selected) => {
        // 判断地址是否正确
        const hasCity = place.city.code !== ""
        const hasArea = place.area.code !== ""
        const hasStreet = place.street.code !== ""
        const hasVillage = place.village.code !== ""

        let newlocation
        let newlocationName
        switch (selected) {
            case "PrimarySchool":
                if (hasVillage) {
                    newlocation = {
                        province: place.province.code,
                        city: place.city.code,
                        area: place.area.code,
                        street: place.street.code,
                        village: place.village.code
                    }
                    newlocationName = place.province.name + place.city.name + place.area.name + place.street.name + place.village.name
                }
                break;
            case "JuniorMiddleSchool":
                if (hasStreet) {
                    newlocation = {
                        province: place.province.code,
                        city: place.city.code,
                        area: place.area.code,
                        street: place.street.code,
                        village: ""
                    }
                    newlocationName = place.province.name + place.city.name + place.area.name + place.street.name
                }
                break;
            case "HighSchool":
                if (hasArea) {
                    newlocation = {
                        province: place.province.code,
                        city: place.city.code,
                        area: place.area.code,
                        street: "",
                        village: ""
                    }
                    newlocationName = place.province.name + place.city.name + place.area.name
                }
                break;
            case 'VocationalHighSchool':
            case 'TechnicalSchool':
            case 'SecondarySpecializedSchool':
            case 'JuniorCollege':
            case 'Undergraduate':
            case 'Master':
            case 'Doctor':
            case 'JuniorToCollege':
            case 'HighToCollege':
            case 'HighToJunior':
                if (hasCity) {
                    newlocation = {
                        province: place.province.code,
                        city: place.city.code,
                        area: "",
                        street: "",
                        village: ""
                    }
                    newlocationName = place.province.name + place.city.name
                }
                break;
        }
        return { newlocation, newlocationName }
    }

    _handlePlace = (place, addLocation, client) => {
        const { selected } = this.state
        if (selected === "0") {
            Alert.alert('你尚未选择学历')
            return
        }

        // 检查地点是否合格
        const { newlocation, newlocationName } = this._getnewLocation(place, selected)

        // 新增地址
        if (newlocation) {
            addLocation({ variables: { location: newlocation, locationName: newlocationName } });
        }
        const data = {
            newSchool: {
                __typename: 'NewSchool',
                id: "",
                name: "",
            },
        };
        client.writeData({ data });

    }

    _selectSchool = () => {
        const { location, selected } = this.state
        if (JSON.stringify(location) === "{}") {
            Alert.alert('你尚未选择地址')
            return
        }

        if (selected === "0") {
            Alert.alert('你尚未选择学历')
            return
        }

        // 判断地址是否正确
        const hasCity = location.city.code !== ""
        const hasArea = location.area.code !== ""
        const hasStreet = location.street.code !== ""
        const hasVillage = location.village.code !== ""
        // 检查地点是否合格

        switch (selected) {
            case "PrimarySchool":
                if (!hasVillage) {
                    Alert.alert('地址选择不完整')
                    return
                }
                break;
            case "JuniorMiddleSchool":
                if (!hasStreet) {
                    Alert.alert('地址选择不完整')
                    return
                }
                break;
            case "HighSchool":
                if (!hasArea) {
                    Alert.alert('地址选择不完整')
                    return
                }
                break;
            case 'VocationalHighSchool':
            case 'TechnicalSchool':
            case 'SecondarySpecializedSchool':
            case 'JuniorCollege':
            case 'Undergraduate':
            case 'Master':
            case 'Doctor':
            case 'JuniorToCollege':
            case 'HighToCollege':
            case 'HighToJunior':
                if (!hasCity) {
                    Alert.alert('未选择市')
                    return
                }
                break;
            default:
                Alert.alert("你尚未选择学历")
                break;
        }
        // 查询地点所有的学校并列示
        const { newlocation, newlocationName } = this._getnewLocation(location, selected)
        this.props.navigation.navigate('SelectSchool', { locationName: newlocationName, kind: this.state.selected })
    }

    _selectMajor = () => {
        const { selected } = this.state
        if (selected === "0") {
            Alert.alert('你尚未选择学历')
            return
        }
        this.props.navigation.navigate('SelectMajor', { education: selected })
    }

    _selectClass = () => {
        const { startYear, endYear } = this.state
        const reg = /^\d{4}$/;
        if (!reg.test(startYear)) {
            Alert.alert('你输入的入学时间有误，请输入四位数字')
            return
        }
        if (!reg.test(endYear)) {
            Alert.alert('你输入的毕业时间有误，请输入四位数字')
            return
        }
        this.props.navigation.navigate('SelectClass', { startYear, endYear })
    }

    _reconfirm = (addStudy, client) => {
        const { startYear, endYear, selected, location, hasMajor } = this.state
        const { newSchool } = client.readQuery({ query: GET_NEWSCHOOL })
        const { newMajor } = client.readQuery({ query: GET_NEWMAJOR })
        const { newGradeAndClasses } = client.readQuery({ query: GET_NEWGRADEANDCLASSES })
        const sortedNewGradeAndClasses = newGradeAndClasses.sort((a, b) => a.grade - b.grade)

        if (selected === "0") {
            Alert.alert('未选择学历')
            return
        }
        if (startYear === "") {
            Alert.alert('未选择入学年份')
            return
        }
        if (endYear === "") {
            Alert.alert('未选择毕业年份')
            return
        }
        if (JSON.stringify(location) == "{}") {
            Alert.alert('未选择地点')
            return
        }
        if (newSchool.id === "") {
            Alert.alert('未选择学校')
            return
        }
        if (hasMajor && newMajor.id === "") {
            Alert.alert('未选择专业')
            return
        }
        if (sortedNewGradeAndClasses.length === 0) {
            Alert.alert('未选择班级')
            return
        }

        Alert.alert(
            '请确认:',
            `
            学历:${educations[selected]}
            入学时间:${startYear}
            毕业时间:${endYear}
            所在地点:${display(location)}
            学校名称:${newSchool.name}
            ${hasMajor ? `专业名称:${newMajor.name}` : ""}
            所在班级:
            ${sortedNewGradeAndClasses.map(newGradeAndClass => (`${newGradeAndClass.grade}年级${newGradeAndClass.className === "0" ? "未分" : newGradeAndClass.className}班/`))}
            
            上述信息一经确认将无法修改。
        `,
            [
                { text: '取消', onPress: () => console.log('取消'), style: 'cancel' },
                { text: '确认', onPress: () => this._submit(startYear, endYear, newSchool, newMajor, sortedNewGradeAndClasses, addStudy, client) },
            ],
            { cancelable: false }
        )
    }

    _submit = (startYear, endYear, newSchool, newMajor, sortedNewGradeAndClasses, addStudy, client) => {

        const { me } = client.readQuery({ query: GET_ME })
        const birthyear = new Date(me.birthday).getFullYear()
        if (birthyear > startYear) {
            Alert.alert('出生后才能上学，请检查出生日期是否正确')
            return
        }
        if (birthyear + 3 > parseInt(startYear)) {
            Alert.alert('太小了，无法上学，请检查出生日期是否设置错误')
            return
        }
        if (parseInt(startYear) > parseInt(endYear)) {
            Alert.alert('入学年份必须小于毕业年份')
            return
        }
        if ((parseInt(startYear) + 10) < parseInt(endYear)) {
            Alert.alert('你真行，这么久还没毕业')
            return
        }
        if (parseInt(startYear) > (new Date()).getFullYear) {
            Alert.alert('请检查入学时间和毕业时间是否有误')
            return
        }

        const existYears = me.studies.map(study => (new Date(study.startTime)).getFullYear())

        const years = []
        for (let i = parseInt(startYear); i < endYear; i++) {
            if (~existYears.indexOf(i)) {
                Alert.alert('检查入学时间是否正确')
                return
            }
            years.push(i)
        }
        if (years.length !== sortedNewGradeAndClasses.length) {
            Alert.alert('班级数与入学时间和毕业时间不符')
            return
        }


        for (let i = 0; i < years.length; i++) {
            addStudy({
                variables: {
                    year: years[i].toString(),
                    schoolId: newSchool.id,
                    majorId: newMajor.id,
                    grade: sortedNewGradeAndClasses[i].grade,
                    className: sortedNewGradeAndClasses[i].className
                },
                optimisticResponse: {
                    __typename: "Mutation",
                    addStudy: {
                        __typename: "SchoolEdu",
                        id: i.toString(),
                        startTime: `${years[i]}-9-1`,
                        className: sortedNewGradeAndClasses[i].className,
                        grade: sortedNewGradeAndClasses[i].grade,
                        major: {
                            __typename: "Major",
                            id: newMajor.id,
                            name: newMajor.name,
                        },
                        students:{
                            __typename:'User',
                            id:me.id,
                            name:me.name,
                            avatar:me.avatar,
                        },
                        school: {
                            __typename: "School",
                            id: newSchool.id,
                            name: newSchool.name,
                            kind: this.state.selected,
                            location: {
                                __typename: "Location",
                                id: i.toString(),
                                name: display(this.state.location),
                                province:null,
                                city:null,
                                area:null,
                            }
                        }
                    }
                },
                update: (cache, { data }) => {
                    const data1 = cache.readQuery({ query: GET_ME });
                    data1.me.studies.push(data.addStudy);
                    cache.writeQuery({
                        query: GET_ME,
                        data: data1
                    });
                }
            })
        }
        // 清空缓存数据
        const clearNewSchool = {
            newSchool: {
                __typename: 'NewSchool',
                id: "",
                name: "",
            },
        };
        const clearNewMajor = {
            newMajor: {
                __typename: 'NewMajor',
                id: "",
                name: "",
            },
        };
        client.writeQuery({ query: GET_NEWSCHOOL, data: clearNewSchool })
        client.writeQuery({ query: GET_NEWMAJOR, data: clearNewMajor })
        client.writeQuery({ query: GET_NEWGRADEANDCLASSES, data: { newGradeAndClasses: [] } })

        this.props.navigation.navigate('StudyHistroy')
    }

    _renderPlace = () => (
        <Mutation
            mutation={ADD_LOCATION}
        >
            {(addLocation, { client }) => {
                return (<Region
                    handlePlace={(place) => this._handlePlace(place, addLocation, client)}
                    place={this.state.location}
                />)
            }}
        </Mutation>
    )

    _renderSchoolName = () => (
        <Query
            query={GET_NEWSCHOOL}
        >
            {({ data }) => {
                if (data.newSchool.id === "") {
                    return (<TouchableNativeFeedback
                        onPress={this._selectSchool}
                    >
                        <Text>未填写</Text>
                    </TouchableNativeFeedback>)

                }
                return (<TouchableNativeFeedback
                    onPress={this._selectSchool}
                >
                    <Text>{data.newSchool.name}</Text>
                </TouchableNativeFeedback>)
            }}
        </Query>
    )

    _renderMajor = () => (
        <Query
            query={GET_NEWMAJOR}
        >
            {({ data }) => {
                if (data.newMajor.id === "") {
                    return (<TouchableNativeFeedback
                        onPress={this._selectMajor}
                    >
                        <Text>未填写</Text>
                    </TouchableNativeFeedback>)

                }
                return (<TouchableNativeFeedback
                    onPress={this._selectMajor}
                >
                    <Text>{data.newMajor.name}</Text>
                </TouchableNativeFeedback>)
            }}
        </Query>
    )

    _renderGradeAndClass = () => (
        <Query
            query={GET_NEWGRADEANDCLASSES}
        >
            {({ data }) => {
                if (data.newGradeAndClasses.length === 0) {
                    return (<TouchableNativeFeedback
                        onPress={this._selectClass}
                    >
                        <Text>未填写</Text>
                    </TouchableNativeFeedback>)

                }
                return (<TouchableNativeFeedback
                    onPress={this._selectClass}
                >
                    <Text>{`${grades[data.newGradeAndClasses[0].grade]}年级${data.newGradeAndClasses[0].className === "0" ? "未分" : data.newGradeAndClasses[0].className}班...`}</Text>
                </TouchableNativeFeedback>)
            }}
        </Query>
    )



    render() {
        const { selected, startYear, endYear, location, hasMajor } = this.state
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem >
                            <Left style={styles.left}>
                                <Text>学历类别:</Text>
                            </Left>
                            <Right style={styles.right}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    style={{ height: 20 }}
                                    selectedValue={this.state.selected}
                                    onValueChange={this.onValueChange}
                                >
                                    <Picker.Item label="" value="0" />
                                    {
                                        Object.keys(educations).map(kind => <Picker.Item key={kind} label={educations[kind]} value={kind} />)
                                    }
                                </Picker>
                            </Right>
                        </ListItem>
                        <ListItem>

                            <Left style={styles.left}>
                                <Text>入学年份:</Text>
                            </Left>
                            <Right style={styles.right}>
                                <TextInput
                                    style={{ width: 50, borderBottomColor: 'black', borderBottomWidth: 1, paddingHorizontal: 5 }}
                                    keyboardType='numeric'
                                    maxLength={4}
                                    placeholder="年度"
                                    value={startYear}
                                    onChangeText={(startYear) => this.setState({ startYear })}
                                />
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left style={styles.left}>
                                <Text>毕业年份:</Text>
                            </Left>
                            <Right style={styles.right}>
                                <TextInput
                                    style={{ width: 50, borderBottomColor: 'black', borderBottomWidth: 1, paddingHorizontal: 5 }}
                                    keyboardType='numeric'
                                    maxLength={4}
                                    placeholder="年度"
                                    value={endYear}
                                    onChangeText={(endYear) => this.setState({ endYear })}
                                />
                            </Right>
                        </ListItem>

                        <ListItem>
                            <Left style={styles.left}>
                                <Text>地点:</Text>
                            </Left>
                            <Right style={styles.right}>
                                {this._renderPlace()}
                            </Right>
                        </ListItem>

                        <ListItem>
                            <Left style={styles.left}>
                                <Text>学校名称:</Text>
                            </Left>
                            <Right style={styles.right}>
                                {this._renderSchoolName()}
                            </Right>
                        </ListItem>

                        {
                            hasMajor && (
                                <ListItem>
                                    <Left style={styles.left}>
                                        <Text>专业名称:</Text>
                                    </Left>
                                    <Right style={styles.right}>
                                        {this._renderMajor()}
                                    </Right>
                                </ListItem>
                            )
                        }

                        <ListItem>
                            <Left style={styles.left}>
                                <Text>所在班级:</Text>
                            </Left>
                            <Right style={styles.right}>
                                {this._renderGradeAndClass()}
                            </Right>
                        </ListItem>

                        <ListItem>
                            <Body>
                                <Mutation
                                    mutation={ADD_STUDY}
                                >
                                    {
                                        (addStudy, { loading, error, client }) => {
                                            return (<Button
                                                block
                                                disabled={loading?true:false}
                                                onPress={() => this._reconfirm(addStudy, client)}
                                            >
                                                <Text>确定</Text>
                                                {loading && <Spinner />}
                                                {error && Alert.alert(errorMessage(error))}
                                            </Button>)
                                        }
                                    }
                                </Mutation>

                            </Body>
                        </ListItem>
                    </List>

                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    left: {
        flex: 0.4
    },
    right: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'flex-end'

    },
})


export default withNavigation(Study)
