# Generated by Django 2.2.10 on 2020-08-04 10:55

from django.db import migrations
import multi_email_field.fields


class Migration(migrations.Migration):

    dependencies = [
        ('kubeportal', '0007_auto_20200411_1458'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='alt_mails',
            field=multi_email_field.fields.MultiEmailField(blank=True, default=None, null=True),
        ),
    ]
