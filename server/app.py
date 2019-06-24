from flask import Flask, jsonify,request
import pymysql
from flask_cors import *
app = Flask(__name__)
CORS(app, supports_credentials=True)


db = pymysql.connect("localhost","root","123456","managesys")
cursor = db.cursor(cursor=pymysql.cursors.DictCursor)

@app.route('/')
def index():
    return '后台接口'

class StaffCtrl:
    def __init__(self,name,id,detail,timestramp):
        self.id = id
        self.name = name
        self.detail = detail
        self.timestramp = timestramp

    def getall_staff(self):
        sql = "SELECT * FROM 事件表 "
        cursor.execute(sql)
        return jsonify(cursor.fetchall())
    def get_staff(self):
        sql = "SELECT * FROM 事件表 WHERE id=%s"
        cursor.execute(sql,(self.id))
        return jsonify(cursor.fetchall())
    def add(self):
        sql = "insert into 事件表 values(%s,%s,%s,%s,null)"
        effect_row=cursor.execute(sql,(self.name,self.id,self.detail,self.timestramp)) 
        db.commit()
        sql = "SELECT * FROM 事件表 WHERE id=%s"
        cursor.execute(sql,(self.id))
        return jsonify(cursor.fetchall())
    def edit(self):
        sql = 'update 事件表 set name = %s,detail = %s,timestramp = %s where name = %s and id = %s'
        effect_row=cursor.execute(sql,(self.name,self.detail,self.timestramp,self.name,self.id)) 
        db.commit()
        sql = "SELECT * FROM 事件表 WHERE id=%s"
        cursor.execute(sql,(self.id))
        return jsonify(cursor.fetchall())
    def delete(self):
        sql = 'delete from 事件表  where id=%s and name = %s'
        effect_row=cursor.execute(sql,(self.id,self.name))
        db.commit()
        sql = "SELECT * FROM 事件表 WHERE id=%s"
        cursor.execute(sql,(self.id))
        return jsonify(cursor.fetchall())

class DiaryCtrl:
    def __init__(self,name,id,intro,timestramp):
        self.id = id
        self.name = name
        self.intro = intro
        self.timestramp = timestramp
    def getall_diary(self):
        sql = "SELECT * FROM 日记表 "
        cursor.execute(sql)
        return jsonify(cursor.fetchall())
    def get_diary(self):
        sql = "SELECT * FROM 日记表 WHERE id=%s"
        cursor.execute(sql,(self.id))
        return jsonify(cursor.fetchall())
    def add(self):
        sql = "insert into 日记表 values(%s,%s,%s,%s,null)"
        effect_row=cursor.execute(sql,(self.name,self.id,self.intro,self.timestramp)) 
        db.commit()
        sql = "SELECT * FROM 日记表 WHERE id=%s"
        cursor.execute(sql,(self.id))
        return jsonify(cursor.fetchall())
    def edit(self):
        sql = 'update 日记表 set name = %s,intro = %s,timestramp = %s where name = %s and id = %s'
        effect_row=cursor.execute(sql,(self.name,self.intro,self.timestramp,self.name,self.id)) 
        print(self.name,self.id,self.intro)
        db.commit()
        sql = "SELECT * FROM 日记表 WHERE id=%s"
        cursor.execute(sql,(self.id))
        return jsonify(cursor.fetchall())
    def delete(self):
        sql = 'delete from 日记表  where id=%s and name = %s'
        effect_row=cursor.execute(sql,(self.id,self.name))
        db.commit()
        sql = "SELECT * FROM 日记表 WHERE id=%s"
        cursor.execute(sql,(self.id))
        return jsonify(cursor.fetchall())

class AccountCtrl:
    def __init__(self,income,outcome,id):
        self.income = income
        self.outcome = outcome
        self.id = id
    def getAccount(self):
        sql = "SELECT * FROM 记账本表 "
        cursor.execute(sql)
        return jsonify(cursor.fetchall())
    def setincome(self):
        income = self.income
    def setoutcome(self):
        outcome = self.outcome
    def computed(self):
        total = int(self.income)-int(self.outcome)
        sql = "insert into 记账本表 values(%s,%s,%s,%s,null)"
        effect_row=cursor.execute(sql,(self.income,self.id,self.outcome,str(total)))
        db.commit()
        sql = "SELECT * FROM 记账本表 WHERE id=%s"
        cursor.execute(sql,(self.id))
        return jsonify(cursor.fetchall())

class ContactCtrl:
    def __init__(self,id,name,email,number,address):
        self.id = id
        self.name = name
        self.email = email
        self.number = number
        self.address = address
    def get_contact(self):
        sql = 'SELECT * FROM 通讯录表 WHERE id =%s'
        cursor.execute(sql,(self.id))
        return jsonify(cursor.fetchall())
    def getall_contact(self):
        sql = 'SELECT * FROM 通讯录表 '
        cursor.execute(sql)
        return jsonify(cursor.fetchall())
    def add(self):
        sql = "insert into 通讯录表 values(%s,%s,%s,%s,%s)"
        effect_row=cursor.execute(sql,(self.id,self.name,self.email,self.number,self.address)) 
        db.commit()
        sql = "SELECT * FROM 通讯录表 WHERE id=%s"
        cursor.execute(sql,(self.id))
        return jsonify(cursor.fetchall())
    def edit(self):
        sql = 'update 通讯录表 set email = %s,number = %s,address = %s where id = %s and name = %s'
        effect_row=cursor.execute(sql,(self.email,self.number,self.address,self.id,self.name)) 
        db.commit()
        sql = "SELECT * FROM 通讯录表 WHERE id=%s"
        cursor.execute(sql,(self.id))
        return jsonify(cursor.fetchall())
    def delete(self):
        sql = 'delete from 通讯录表  where id=%s and name = %s'
        effect_row=cursor.execute(sql,(self.id,self.name))
        db.commit()
        sql = "SELECT * FROM 通讯录表 WHERE id=%s"
        cursor.execute(sql,(self.id))
        return jsonify(cursor.fetchall())

@app.route('/get_staff', methods=['POST'])
def getStaff():
    id = request.values.get('id')
    return StaffCtrl(None,id,None,None).get_staff()

@app.route('/getall_staff', methods=['POST'])
def getallStaff():
    return StaffCtrl(None,None,None,None).getall_staff()

@app.route('/add_staff', methods=['POST'])
def addStaff():
    id = request.values.get('id')
    name = request.values.get('name')
    detail = request.values.get('detail')
    timestramp  = request.values.get('timestramp')
    return StaffCtrl(name,id,detail,timestramp).add()

@app.route('/edit_staff', methods=['POST'])
def editStaff():
    id = request.values.get('id')
    name = request.values.get('name')
    detail = request.values.get('detail')
    timestramp  = request.values.get('timestramp')
    return StaffCtrl(name,id,detail,timestramp).edit()

@app.route('/delete_staff',methods=['POST'])
def deleteStaff():
    id = request.values.get('id')
    name = request.values.get('name')
    return StaffCtrl(name,id,None,None).delete()


@app.route('/get_diary', methods=['POST'])
def getDiary():
    id = request.values.get('id')
    return DiaryCtrl(None,id,None,None).get_diary()

@app.route('/getall_diary', methods=['POST'])
def getallDiary():
    return DiaryCtrl(None,None,None,None).getall_diary()

@app.route('/add_diary', methods=['POST'])
def addDiary():
    id = request.values.get('id')
    name = request.values.get('name')
    intro = request.values.get('intro')
    timestramp  = request.values.get('timestramp')
    return DiaryCtrl(name,id,intro,timestramp).add()

@app.route('/edit_diary', methods=['POST'])
def editDiary():
    id = request.values.get('id')
    name = request.values.get('name')
    intro = request.values.get('intro')
    timestramp  = request.values.get('timestramp')
    return DiaryCtrl(name,id,intro,timestramp).edit()

@app.route('/delete_diary',methods=['POST'])
def deleteDiary():
    id = request.values.get('id')
    name = request.values.get('name')
    return DiaryCtrl(name,id,None,None).delete()


@app.route('/set_acounnt',methods=['POST'])
def setacounnt():
    id = request.values.get('id')
    income = request.values.get('income')
    outcome = request.values.get('outcome')
    return AccountCtrl(income,outcome,id).computed()

@app.route('/get_acounnt',methods=['POST'])
def getacounnt():
    return AccountCtrl(None,None,None).getAccount()


@app.route('/get_contact',methods=['POST'])
def getcontact():
    id = request.values.get('id')
    return ContactCtrl(id,None,None,None,None).get_contact()

@app.route('/getall_contact',methods=['POST'])
def getallcontact():
    return ContactCtrl(None,None,None,None,None).getall_contact()

@app.route('/add_contact',methods=['POST'])
def addcontact():
    id = request.values.get('id')
    name = request.values.get('name')
    email = request.values.get('email')
    number = request.values.get('number')
    address = request.values.get('address')
    return ContactCtrl(id,name,email,number,address).add()

@app.route('/edit_contact', methods=['POST'])
def editcontact():
    id = request.values.get('id')
    name = request.values.get('name')
    email = request.values.get('email')
    number = request.values.get('number')
    address = request.values.get('address')
    return ContactCtrl(id,name,email,number,address).edit()

@app.route('/delete_contact',methods=['POST'])
def deletecontact():
    id = request.values.get('id')
    name = request.values.get('name')
    return ContactCtrl(id,name,None,None,None).delete()

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080)